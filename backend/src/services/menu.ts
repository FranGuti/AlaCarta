import Restaurant from "../models/Restaurant";
import Product from "../models/Product";
import { RestaurantType } from "../@types/modelTypes";
import Menu from "../models/Menu";

const createMenuService = async (props: {
    banner: string;
    color: string;
    restaurant: RestaurantType;
}) => {
    const { banner, color, restaurant } = props;
    if (restaurant.menu) return null;
    const newMenu = new Menu({
        restaurant: restaurant._id,
        banner,
        color,
        products: [],
    });
    await newMenu.save();
    restaurant.menu = newMenu._id;
    await restaurant.save();
    return newMenu;
};

const updateMenuService = async (props: {
    banner: string;
    color: string;
    restaurant: RestaurantType;
}) => {
    const { banner, color, restaurant } = props;
    if (!restaurant.menu) return null;
    const menu = await Menu.findById(restaurant.menu);
    if (!menu) return null;
    if (banner) menu.banner = banner;
    if (color) menu.color = color;
    await menu.save();
    return menu;
};

const getMenuOfRestaurant = async (restaurant: RestaurantType) => {
    const menu = await Menu.findById(restaurant.menu);
    return menu;
};

export { createMenuService, updateMenuService, getMenuOfRestaurant };
