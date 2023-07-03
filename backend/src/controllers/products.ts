import { Request, Response } from "express";
import { getRestaurantByUrl } from "../services/restaurant";
import {
    addProductService,
    getProductById,
    getProductsByCategory,
} from "../services/products";

const addProductController = async (req: Request, res: Response) => {
    const { name, picture, description, productCategories, price } = req.body;
    const restaurant = await getRestaurantByUrl(
        req.session.restaurantUrl as string
    );
    if (!restaurant) return res.status(404).send("Restaurant not found");
    const product = await addProductService({
        name,
        picture,
        description,
        productCategories,
        price,
        restaurant,
    });
    if (!product)
        return res
            .status(400)
            .send(
                "Menu doesnt exist in this restaurant please create one first"
            );
    return res.status(200).send(product);
};

const getProductsController = async (req: Request, res: Response) => {
    const { productId } = req.params;
    if (productId) {
        try {
            const product = await getProductById(productId);
            if (!product) return res.status(400).send("Invalid product id");
            return res.status(200).send(product);
        } catch (err) {
            return res.status(400).send("Invalid product id");
        }
    }
    const { category, firstKPopular } = req.query;
    // TODO popularity
    const restaurant = await getRestaurantByUrl(
        req.session.restaurantUrl as string
    );
    if (!restaurant) return res.status(404).send("Restaurant not found");
    const products = await getProductsByCategory(
        category as string,
        restaurant
    );
    return res.status(200).send(products);
};

export { addProductController, getProductsController };
