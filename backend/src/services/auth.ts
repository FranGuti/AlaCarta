import { Types } from "mongoose";
import { hashPassword, comparePassword } from "../utils/hasher";
import { getDefaultProductCategories } from "../utils/defaultValues";
import { employeeCategoryEnum } from "../@types/enums";
import User from "../models/User";
import Restaurant from "../models/Restaurant";
import { mailingService } from "./mailing";

const authenticateUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (user && comparePassword(password, user.password as string)) {
        return user;
    }
    return null;
};

const createUser = async (
    email: string,
    restaurantUrl: string,
    categoryEnum: number
) => {
    const existingUser = await User.findOne({ email });
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });

    if (!restaurant) return null;
    if (existingUser) {
        existingUser.userCategories.push({
            restaurant: restaurant._id,
            categoryEnum: categoryEnum,
        });
        await existingUser.save();
        restaurant.employees.push(existingUser._id);
        await restaurant.save();
        return existingUser;
    }

    const newUser = new User({
        email,
        userCategories: [
            {
                restaurant: restaurant._id,
                categoryEnum: categoryEnum,
            },
        ],
        changeInfoCode: hashPassword(email),
    });
    await newUser.save();
    await mailingService(email, newUser.changeInfoCode as string);
    restaurant.employees.push(newUser._id);
    await restaurant.save();
    return newUser;
};

const updateUser = async (
    userId: Types.ObjectId,
    newFields: {
        name?: string;
        email?: string;
        password?: string;
        newRestaurant?: Types.ObjectId;
        newRestaurantName?: string;
        newRestaurantUrl?: string;
        newCategoryEnum?: number;
    }
) => {
    const user = await User.findById(userId);
    if (!user) return null;

    if (newFields.name) user.name = newFields.name;
    if (newFields.email) user.email = newFields.email;
    if (newFields.password) user.password = hashPassword(newFields.password);
    if (newFields.newRestaurant) {
        user.userCategories.push({
            restaurant: newFields.newRestaurant,
            categoryEnum: newFields.newCategoryEnum!,
        });
    }
    user.save();
    return user;
};

const createRestaurant = async (
    name: string,
    urlSuffix: string,
    paymentInfo: string,
    ownerName: string,
    ownerEmail: string,
    ownerPassword: string
) => {
    const existingRestaurant = await Restaurant.findOne({ urlSuffix });
    if (existingRestaurant) return [null, null];

    const defaultProductCategories = await getDefaultProductCategories();

    const newRestaurant = new Restaurant({
        name,
        urlSuffix,
        paymentInfo,
        productCategories: defaultProductCategories,
    });

    const owner = await User.findOne({ email: ownerEmail });
    if (owner) {
        const updatedOwner = await updateUser(owner._id, {
            newRestaurant: newRestaurant._id,
            newRestaurantName: name,
            newRestaurantUrl: urlSuffix,
            newCategoryEnum: employeeCategoryEnum.Owner,
            name: ownerName,
            password: ownerPassword,
        });
        newRestaurant.employees.push(updatedOwner!._id);
        await newRestaurant.save();
        return [newRestaurant, owner];
    } else {
        const hashedPassword = hashPassword(ownerPassword);
        const newOwner = new User({
            name: ownerName,
            email: ownerEmail,
            password: hashedPassword,
            userCategories: [
                {
                    restaurant: newRestaurant._id,
                    restaurantName: name,
                    restaurantUrl: urlSuffix,
                    categoryEnum: employeeCategoryEnum.Owner,
                },
            ],
        });
        await newOwner.save();
        newRestaurant.employees.push(newOwner._id);
        await newRestaurant.save();
        return [newRestaurant, newOwner];
    }
};

const changeUserInfoService = async (
    email: string,
    name: string,
    password: string,
    changeInfoCode: string
) => {
    const user = await User.findOne({ email });
    if (!user) return null;
    if (user.changeInfoCode !== changeInfoCode) return null;
    user.name = name;
    user.password = hashPassword(password);
    user.changeInfoCode = undefined;
    await user.save();
    return user;
};

export {
    authenticateUser,
    updateUser,
    createUser,
    createRestaurant,
    changeUserInfoService,
};
