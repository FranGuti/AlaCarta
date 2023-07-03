import User from "../models/User";
import Restaurant from "../models/Restaurant";

const restaurantCategoryOfUser = async (
    urlSuffix: string,
    userEmail: string
) => {
    const restaurant = await Restaurant.findOne({ urlSuffix });
    const user = await User.findOne({ email: userEmail });
    if (!restaurant || !user) return [null, null];

    const category = user.userCategories.find(
        (category) => category.restaurant === restaurant._id
    );
    if (!category) return [null, null];
    return [category.categoryEnum, restaurant._id];
};

export { restaurantCategoryOfUser };
