import Restaurant from "../models/Restaurant";

const getRestaurantByUrl = async (restaurantUrl: string) => {
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });
    if (!restaurant) return null;
    return restaurant;
};

export { getRestaurantByUrl };
