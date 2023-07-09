import { orderStatusEnum } from "../@types/enums";
import Order from "../models/Order";
import Product from "../models/Product";
import Restaurant from "../models/Restaurant";
import { Types } from "mongoose";

const addOrderService = async (
    restaurantUrl: string,
    productsAsStrings: string[],
    table: string
) => {
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });
    if (!restaurant) return null;

    let products = [];
    for (const productId of productsAsStrings) {
        const id = new Types.ObjectId(productId);
        products.push(await Product.findById(id));
    }
    if (products.length !== productsAsStrings.length) return null;

    let price = 0;
    products.forEach(async (product) => {
        if (!product) return null;
        price += product.price;
    });
    if (price === 0) return null;

    const newOrder = new Order({
        products,
        table,
        statusEnum: orderStatusEnum.Received,
        price,
        restaurant: restaurant._id,
    });
    await newOrder.save();
    await newOrder.populate("products");
    restaurant.orders.push(newOrder._id);
    await restaurant.save();
    return newOrder;
};

const updateOrderStatusService = async (
    orderId: string,
    statusEnum: number
) => {
    const id = new Types.ObjectId(orderId);
    const order = await Order.findById(id);
    if (!order) return null;
    order.statusEnum = statusEnum;
    await order.save();
    return order;
};

const getOrdersOfRestaurant = async (
    restaurantUrl: string,
    filterByEnum: string
) => {
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });
    if (!restaurant) return null;
    const filterEnum = parseInt(filterByEnum);
    if (isNaN(filterEnum)) {
        const orders = await Order.find({
            _id: { $in: restaurant.orders },
        }).populate("products");
        return orders;
    }
    const orders = await Order.find({
        _id: { $in: restaurant.orders },
        statusEnum: filterEnum,
    }).populate("products");
    return orders;
};

const getOrderStatisticsOfRestaurant = async (
    restaurantUrl: string,
    startDate: string,
    endDate: string,
    productId: string
) => {
    // where statusEnum is delivered
    const restaurant = await Restaurant.findOne({ urlSuffix: restaurantUrl });
    if (!restaurant) return null;
    if (productId) {
        const id = new Types.ObjectId(productId);
        const statistics = Order.aggregate([
            {
                $match: {
                    restaurant: restaurant._id,
                    statusEnum: orderStatusEnum.Delivered,
                    createdAt: {
                        $gte: startDate
                            ? new Date(startDate)
                            : new Date("1970-01-01"),
                        $lte: endDate
                            ? new Date(endDate)
                            : new Date("2200-01-01"),
                    },
                },
            },
            {
                $unwind: "$products",
            },
            {
                $match: {
                    products: id,
                },
            },
        ]);
        return statistics;
    }
    const statistics = Order.aggregate([
        {
            $match: {
                restaurant: restaurant._id,
                statusEnum: orderStatusEnum.Delivered,
                createdAt: {
                    $gte: startDate
                        ? new Date(startDate)
                        : new Date("1970-01-01"),
                    $lte: endDate ? new Date(endDate) : new Date("2200-01-01"),
                },
            },
        },
    ]);
    return statistics;
};

export {
    addOrderService,
    updateOrderStatusService,
    getOrdersOfRestaurant,
    getOrderStatisticsOfRestaurant,
};
