import { Request, Response } from "express";
import {
    deleteEmployeeFromRestaurantService,
    deleteRestaurantService,
    getEmployeesOfRestaurantService,
    getRestaurantByUrl,
    updateEmployeeService,
    updateRestaurantService,
} from "../services/restaurant";

const getRestaurantController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    const restaurant = await getRestaurantByUrl(restaurantUrl as string);
    if (!restaurant) return res.status(404).send("Restaurant not found");
    return res.status(200).send(restaurant);
};

const getEmployeesController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    const restaurant = await getRestaurantByUrl(restaurantUrl as string);
    if (!restaurant) return res.status(404).send("Restaurant not found");
    const employees = await getEmployeesOfRestaurantService(restaurant);
    return res.status(200).send(employees);
};

const updateEmployeeController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    const { employeeId } = req.params;
    const { categoryEnum } = req.body;
    if (!restaurantUrl) return res.status(400).send("Not in a restaurant");
    if (!employeeId || !categoryEnum) {
        return res.status(400).send("Missing data");
    }
    const restaurant = await getRestaurantByUrl(restaurantUrl);
    if (!restaurant) return res.status(404).send("Restaurant not found");
    const updatedEmployee = await updateEmployeeService(
        restaurant,
        employeeId,
        categoryEnum
    );
    if (!updatedEmployee)
        return res.status(400).send("Error updating employee");
    return res.status(200).send(updatedEmployee);
};

const deleteEmployeeController = async (req: Request, res: Response) => {
    const { employeeId } = req.params;
    const { restaurantUrl } = req.session;

    const restaurant = await deleteEmployeeFromRestaurantService(
        restaurantUrl as string,
        employeeId
    );
    if (!restaurant) return res.status(400).send("Error deleting employee");
    return res.status(200).send(restaurant);
};

const deleteRestaurantController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    try {
        const result = await deleteRestaurantService(restaurantUrl as string);
        if (
            !result ||
            (result &&
                (!result.restaurantDeleteResult.acknowledged ||
                    !result.menuDeleteResult.acknowledged ||
                    !result.productsDeleteResult.acknowledged))
        )
            return res.status(400).send(result || "Error deleting restaurant");
        return res.status(200).send(result);
    } catch (err) {
        return res.status(500).send("Error deleting product");
    }
};

const updateRestaurantController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    if (!restaurantUrl) return res.status(400).send("Not in a restaurant");
    const { name, urlSuffix, paymentInfo, productCategories } = req.body;
    if (!name && !urlSuffix && !paymentInfo && !productCategories) {
        return res.status(400).send("No data to update");
    }
    const restaurant = await updateRestaurantService(
        restaurantUrl,
        name,
        urlSuffix,
        paymentInfo,
        productCategories
    );
    if (!restaurant) return res.status(400).send("Error updating restaurant");
    return res.status(200).send(restaurant);
};

export {
    getRestaurantController,
    getEmployeesController,
    updateEmployeeController,
    deleteEmployeeController,
    deleteRestaurantController,
    updateRestaurantController,
};
