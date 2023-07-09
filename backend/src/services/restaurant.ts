import Restaurant from "../models/Restaurant";
import Menu from "../models/Menu";
import Product from "../models/Product";
import User from "../models/User";
import { RestaurantType } from "../@types/modelTypes";

const getRestaurantByUrl = async (restaurantUrl: string) => {
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });
    if (!restaurant) return null;
    return restaurant;
};

const getEmployeesOfRestaurantService = async (restaurant: RestaurantType) => {
    const employeesIds = restaurant.employees;
    const employees = await User.find({ _id: { $in: employeesIds } });
    return employees;
};

const updateEmployeeService = async (
    restaurant: RestaurantType,
    employeeId: string,
    categoryEnum: number
) => {
    const employee = await User.findById(employeeId);
    if (!employee) return null;
    const category = employee.userCategories.find(
        (category) =>
            category.restaurant.toString() === restaurant._id.toString()
    );
    if (!category) return null;
    category.categoryEnum = categoryEnum;
    await employee.save();
    return employee;
};

const deleteEmployeeFromRestaurantService = async (
    restaurantUrl: string,
    employeeId: string
) => {
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });
    if (!restaurant) return null;
    restaurant.employees = restaurant.employees.filter(
        (id) => id.toString() !== employeeId
    );
    await restaurant.save();
    return restaurant;
};

const deleteRestaurantService = async (restaurantUrl: string) => {
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });
    if (!restaurant) return null;

    for (const employeeId of restaurant.employees) {
        const employee = await User.findById(employeeId);
        if (!employee) continue;
        employee.userCategories = employee.userCategories.filter(
            (category) =>
                category.restaurant.toString() !== restaurant._id.toString()
        );
        await employee.save();
    }

    const menuDeleteResult = await Menu.deleteOne({
        restaurant: restaurant._id,
    });
    const productsDeleteResult = await Product.deleteMany({
        restaurant: restaurant._id,
    });
    const restaurantDeleteResult = await Restaurant.deleteOne({
        urlSuffix: restaurantUrl,
    });
    return { menuDeleteResult, productsDeleteResult, restaurantDeleteResult };
};

const updateRestaurantService = async (
    restaurantUrl: string,
    name: string,
    urlSuffix: string,
    paymentInfo: string,
    productCategories: string[]
) => {
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });
    if (!restaurant) return null;
    if (name) restaurant.name = name;
    if (urlSuffix) restaurant.urlSuffix = urlSuffix;
    if (paymentInfo) restaurant.paymentInfo = paymentInfo;
    if (productCategories) restaurant.productCategories = productCategories;
    await restaurant.save();
    return restaurant;
};

const getUserById = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) return null;
    return user;
};

export {
    getRestaurantByUrl,
    getEmployeesOfRestaurantService,
    updateEmployeeService,
    deleteEmployeeFromRestaurantService,
    deleteRestaurantService,
    updateRestaurantService,
    getUserById,
};
