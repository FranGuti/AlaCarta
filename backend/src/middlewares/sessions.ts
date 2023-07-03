import mongoose from "mongoose";
import User from "../models/User";
import { Request, Response, NextFunction } from "express";

const populateSession = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const qid = req.cookies.qid;
    if (!qid) return next();
    const session = await mongoose.connection.db
        .collection("sessions")
        .findOne({ _id: qid });
    if (!session) return next();
    const sessionInfo = JSON.parse(session.session);
    const user = await User.findOne({ _id: sessionInfo.user._id });
    if (!user) return next();
    req.session.user = user;
    next();
};

const setRestaurantUrlInSession = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { restaurantUrl } = req.params as { restaurantUrl: string };
    req.session.restaurantUrl = restaurantUrl;
    next();
};

export { populateSession, setRestaurantUrlInSession };
