import { ObjectId } from "mongodb";
import { hashPassword, comparePassword } from "../utils/hasher";
import { getDefaultProductCategories } from "../utils/defaultValues";
import { employeeCategoryEnum } from "../@types/enums";
import User from "../models/User";
import Restaurant from "../models/Restaurant";

const authenticateUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (user && comparePassword(password, user.password as string)) {
        return user;
    }
    return null;
};

const createUser = async (
    name: string,
    email: string,
    password: string,
    restaurantUrl: string,
    categoryEnum: number
) => {
    const existingUser = await User.findOne({ email });
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });

    if (existingUser || !restaurant) return null;

    const hashedPassword = hashPassword(password);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        userCategories: [
            {
                restaurant: restaurant._id,
                restaurantName: restaurant.name,
                restaurantUrl: restaurant.urlSuffix,
                categoryEnum: categoryEnum,
            },
        ],
    });
    await newUser.save();
    restaurant.employees.push(newUser._id);
    await restaurant.save();
    return newUser;
};

const updateUser = async (
    userId: ObjectId,
    newFields: {
        name?: string;
        email?: string;
        password?: string;
        newRestaurant?: ObjectId;
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
            restaurantName: newFields.newRestaurantName,
            restaurantUrl: newFields.newRestaurantUrl,
            categoryEnum: newFields.newCategoryEnum,
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

export { authenticateUser, updateUser, createUser, createRestaurant };
