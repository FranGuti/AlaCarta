import User from "../models/User";
import Restaurant from "../models/Restaurant";
import { employeeCategoryEnum } from "../@types/enums";

const restaurantCategoryOfUser = async (
    urlSuffix: string,
    userEmail: string
) => {
    const restaurant = await Restaurant.findOne({ urlSuffix });
    const user = await User.findOne({ email: userEmail });
    if (!restaurant || !user) return [null, null];
    const category = user.userCategories.find(
        (category) =>
            category.restaurant.toString() === restaurant._id.toString()
    );
    if (!category) return [null, null];
    return [category.categoryEnum, restaurant._id];
};

const checkUserPermissions = async (userEmail: string, urlSuffix: string) => {
    const restaurant = await Restaurant.findOne({ urlSuffix });
    const user = await User.findOne({ email: userEmail });
    if (!restaurant || !user) return false;

    const category = user.userCategories.find(
        (category) =>
            category.restaurant.toString() === restaurant._id.toString()
    );
    if (!category) return false;
    if (category.categoryEnum > employeeCategoryEnum.Manager) {
        return false;
    }
    return true;
};

export { restaurantCategoryOfUser, checkUserPermissions };
