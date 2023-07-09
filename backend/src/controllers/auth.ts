import { Request, Response } from "express";
// models
import { UserType } from "../@types/modelTypes";
// services
import {
    authenticateUser,
    createUser,
    createRestaurant,
    changeUserInfoService,
} from "../services/auth";
import User from "../models/User";
import { mailingService } from "../services/mailing";

const loginController = async (req: Request, res: Response) => {
    if (req.session.user) return res.status(200).send("Already logged in");
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    if (!user) return res.status(401).send("Invalid credentials");
    await User.populate(user, "userCategories.restaurant");
    req.session.user = user;
    res.cookie("qid", req.sessionID, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: "none",
        secure: true,
    });
    res.status(200).send(user);
};

const logoutController = async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).send("Not logged in");
    req.session.destroy((err) => {
        if (err) return res.status(500).send("Internal Server Error");
        res.clearCookie("qid");
        res.status(200).send("Logged out");
    });
};

const sessionController = async (req: Request, res: Response) => {
    if (!req.session.user) return res.status(401).send("Not logged in");
    const user = await User.findOne({ email: req.session.user.email }).populate(
        "userCategories.restaurant"
    );
    return res.status(200).send(user);
};

const registerController = async (req: Request, res: Response) => {
    const { email, restaurantUrl, categoryEnum } = req.body;

    const newUser = await createUser(
        email,
        restaurantUrl,
        parseInt(categoryEnum)
    );
    if (!newUser)
        return res
            .status(409)
            .send("User already exists or restaurant doesnt exist");
    req.session.user = newUser;
    await User.populate(newUser, "userCategories.restaurant");
    res.status(201).send(newUser);
};

const registerRestaurantController = async (req: Request, res: Response) => {
    const {
        name,
        urlSuffix,
        paymentInfo,
        ownerName,
        ownerEmail,
        ownerPassword,
    } = req.body;

    const [restaurant, owner] = await createRestaurant(
        name,
        urlSuffix,
        paymentInfo,
        ownerName,
        ownerEmail,
        ownerPassword
    );
    if (!restaurant || !owner) {
        return res
            .status(409)
            .send("Restaurant with URL suffix already exists");
    }
    req.session.user = owner as UserType;
    await User.populate(owner, "userCategories.restaurant");
    res.cookie("qid", req.sessionID, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: "none",
        secure: true,
    });
    res.status(201).send({ restaurant, owner });
};

const changeUserInfoController = async (req: Request, res: Response) => {
    const { name, email, password, changeInfoCode } = req.body;
    const user = await changeUserInfoService(
        email as string,
        name as string,
        password as string,
        changeInfoCode as string
    );
    if (!user) return res.status(400).send("No user found or invalid code");
    await User.populate(user, "userCategories.restaurant");
    req.session.user = user;
    res.cookie("qid", req.sessionID, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: "none",
        secure: true,
    });
    res.status(200).send(user);
};

export {
    loginController,
    logoutController,
    sessionController,
    registerController,
    registerRestaurantController,
    changeUserInfoController,
};
