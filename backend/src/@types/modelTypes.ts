import { Document, Types } from "mongoose";

interface UserType extends Document {
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password?: string;
    name?: string;
    userCategories: UserCategoriesType[];
}

interface UserCategoriesType {
    restaurant: Types.ObjectId;
    categoryEnum: number;
}

interface RestaurantType extends Document {
    createdAt: Date;
    updatedAt: Date;
    name: string;
    productCategories: string[];
    urlSuffix: string;
    paymentInfo: string;
    employees: Types.ObjectId[];
    orders: Types.ObjectId[];
    menu?: Types.ObjectId | undefined;
}

export { UserType, UserCategoriesType, RestaurantType };
