import "express-session";
import { ObjectId } from "mongoose";
import { UserCategoriesType } from "./modelTypes";

declare module "express-session" {
    interface SessionData {
        user: {
            name: string;
            email: string;
            userCategories: UserCategoriesType[];
        };
        restaurantUrl: string;
    }
}
