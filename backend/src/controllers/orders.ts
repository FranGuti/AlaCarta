import { Request, Response } from "express";
import {
    addOrderService,
    getOrderStatisticsOfRestaurant,
    getOrdersOfRestaurant,
    updateOrderStatusService,
} from "../services/orders";
import { orderStatusEnum } from "../@types/enums";
import Restaurant from "../models/Restaurant";

const addOrderController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    const { products, table } = req.body;
    if (!restaurantUrl) return res.status(400).send("Not in a restaurant");
    if (!products || !table) {
        return res.status(400).send("Missing data");
    }
    try {
        const newOrder = await addOrderService(restaurantUrl, products, table);
        if (!newOrder) return res.status(400).send("Error adding order");
        return res.status(200).send(newOrder);
    } catch (err) {
        return res.status(400).send("Error adding order");
    }
};

const updateOrderStatusController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    const { orderId } = req.params;
    const { statusEnum } = req.body;
    if (!restaurantUrl) return res.status(400).send("Not in a restaurant");
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });
    if (!restaurant) return res.status(404).send("Restaurant not found");
    if (isNaN(statusEnum) || !orderId) {
        return res.status(400).send("Missing data");
    }
    if (!Object.values(orderStatusEnum).includes(statusEnum)) {
        return res.status(400).send("Invalid status");
    }
    try {
        const order = await updateOrderStatusService(orderId, statusEnum);
        if (!order) return res.status(400).send("Error updating order");
        return res.status(200).send(order);
    } catch (err) {
        return res.status(400).send("Error updating order");
    }
};

const getOrdersController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    const { filterByEnum } = req.query;
    if (!restaurantUrl) return res.status(400).send("Not in a restaurant");
    const orders = await getOrdersOfRestaurant(
        restaurantUrl,
        filterByEnum as string
    );
    if (!orders) return res.status(400).send("Error getting orders");
    return res.status(200).send(orders);
};

const getOrderStatisticsController = async (req: Request, res: Response) => {
    const { restaurantUrl } = req.session;
    if (!restaurantUrl) return res.status(400).send("Not in a restaurant");
    const { productId } = req.params;
    const { startDate, endDate } = req.query;
    try {
        const statistics = await getOrderStatisticsOfRestaurant(
            restaurantUrl,
            startDate as string,
            endDate as string,
            productId as string
        );
        if (!statistics)
            return res.status(400).send("Error getting statistics");
        return res.status(200).send(statistics);
    } catch (err) {
        return res.status(400).send("Error getting statistics");
    }
};

export {
    addOrderController,
    updateOrderStatusController,
    getOrdersController,
    getOrderStatisticsController,
};
