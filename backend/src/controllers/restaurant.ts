import { Request, Response } from "express";
import { getRestaurantByUrl } from "../services/restaurant";

const getRestaurantController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    const restaurant = await getRestaurantByUrl(restaurantUrl as string);
    if (!restaurant) return res.status(404).send("Restaurant not found");
    return res.status(200).send(restaurant);
};

export { getRestaurantController };
