import { Request, Response, NextFunction } from "express";
import { employeeCategoryEnum } from "../@types/enums";
import { restaurantCategoryOfUser } from "../services/restaurantInfoGetters";

const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[a-zA-Z]).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlSuffixRegex = /^[a-zA-Z0-9]+$/;

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("Missing fields");

    if (!passwordRegex.test(password) || !emailRegex.test(email)) {
        return res.status(400).send("Invalid Information");
    }

    next();
};

const registerValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session.user) return res.status(401).send("Not logged in");

    const { name, email, password, restaurantUrl, categoryEnum } = req.body;
    if (!name || !email || !password || !restaurantUrl || !categoryEnum) {
        return res.status(400).send("Missing fields");
    }
    if (
        !passwordRegex.test(password) ||
        !emailRegex.test(email) ||
        !urlSuffixRegex.test(restaurantUrl)
    ) {
        return res.status(400).send("Invalid Information");
    }

    const category = parseInt(categoryEnum);
    if (
        isNaN(category) ||
        category < employeeCategoryEnum.Owner ||
        category > employeeCategoryEnum.Employee
    ) {
        return res.status(400).send("Invalid Information");
    }

    const [categoryOfUser, restaurantId] = await restaurantCategoryOfUser(
        restaurantUrl,
        req.session.user.email
    );
    if (isNaN(categoryOfUser as number))
        return res.status(401).send("Not authorized");
    if (
        category <= employeeCategoryEnum.Manager &&
        categoryOfUser !== employeeCategoryEnum.Owner
    ) {
        return res.status(401).send("Not authorized");
    }

    next();
};

const registerRestaurantValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const {
        name,
        urlSuffix,
        paymentInfo,
        ownerName,
        ownerEmail,
        ownerPassword,
    } = req.body;
    if (!name || !urlSuffix || !paymentInfo || !ownerEmail) {
        return res.status(400).send("Missing fields");
    }
    if (
        (ownerPassword && !passwordRegex.test(ownerPassword)) ||
        !emailRegex.test(ownerEmail) ||
        !urlSuffixRegex.test(urlSuffix)
    ) {
        return res.status(400).send("Invalid Information");
    }
    next();
};

export { loginValidation, registerValidation, registerRestaurantValidation };
