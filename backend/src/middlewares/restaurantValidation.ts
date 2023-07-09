import { Request, Response, NextFunction } from "express";
import {
    checkUserPermissions,
    restaurantCategoryOfUser,
} from "../services/restaurantInfoGetters";
import { employeeCategoryEnum } from "../@types/enums";
import { getUserById } from "../services/restaurant";

const addOrUpdateProductValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");
    if (!req.session.restaurantUrl) {
        return res.status(400).send("Not in a restaurant");
    }
    const userHasPermissions = await checkUserPermissions(
        req.session.user.email,
        req.session.restaurantUrl
    );
    if (!userHasPermissions) return res.status(401).send("Unauthorized");
    const { productCategories } = req.body;
    if (productCategories && productCategories.length > 3) {
        return res.status(400).send("Too many categories");
    }
    next();
};

const deleteProductValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");
    if (!req.session.restaurantUrl) {
        return res.status(400).send("Not in a restaurant");
    }
    const userHasPermissions = await checkUserPermissions(
        req.session.user.email,
        req.session.restaurantUrl
    );
    if (!userHasPermissions) return res.status(401).send("Unauthorized");
    next();
};

const createOrUpdateMenuValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");
    if (!req.session.restaurantUrl) {
        return res.status(400).send("Not in a restaurant");
    }
    const userHasPermissions = await checkUserPermissions(
        req.session.user.email,
        req.session.restaurantUrl
    );
    if (!userHasPermissions) return res.status(401).send("Unauthorized");
    next();
};

const deleteOrUpdateRestaurantValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");
    if (!req.session.restaurantUrl) {
        return res.status(400).send("Not in a restaurant");
    }
    const [categoryOfUser, restaurantId] = await restaurantCategoryOfUser(
        req.session.restaurantUrl,
        req.session.user.email
    );
    if (isNaN(categoryOfUser as number)) {
        return res.status(401).send("Not authorized");
    }
    if (categoryOfUser !== employeeCategoryEnum.Owner) {
        return res.status(401).send("Not authorized");
    }
    next();
};

const deleteEmployeeValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { employeeId } = req.params;
    if (!employeeId) return res.status(400).send("Missing data");
    if (!req.session.user) return res.status(401).send("Unauthorized");
    if (!req.session.restaurantUrl) {
        return res.status(400).send("Not in a restaurant");
    }
    const [categoryOfUser, restaurantId] = await restaurantCategoryOfUser(
        req.session.restaurantUrl,
        req.session.user.email
    );
    const employee = await getUserById(employeeId);
    if (!employee) return res.status(400).send("Employee not found");
    const [categoryOfEmployee, restaurantId2] = await restaurantCategoryOfUser(
        req.session.restaurantUrl,
        employee.email
    );
    if (
        isNaN(categoryOfUser as number) ||
        isNaN(categoryOfEmployee as number)
    ) {
        return res.status(401).send("Not authorized");
    }
    if ((categoryOfUser as number) >= (categoryOfEmployee as number)) {
        return res.status(401).send("Not authorized");
    }
    next();
};

const getOrderStatisticsValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session.user) return res.status(401).send("Unauthorized");
    if (!req.session.restaurantUrl) {
        return res.status(400).send("Not in a restaurant");
    }
    const userHasPermissions = await checkUserPermissions(
        req.session.user.email,
        req.session.restaurantUrl
    );
    if (!userHasPermissions) return res.status(401).send("Unauthorized");
    next();
};

export {
    addOrUpdateProductValidation,
    deleteProductValidation,
    createOrUpdateMenuValidation,
    deleteOrUpdateRestaurantValidation,
    deleteEmployeeValidation,
    getOrderStatisticsValidation,
};
