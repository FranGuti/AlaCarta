import { Request, Response } from "express";
import { getRestaurantByUrl } from "../services/restaurant";
import {
    addProductService,
    deleteProductById,
    getFilteredProducts,
    getProductById,
    updateProductService,
} from "../services/products";

const addProductController = async (req: Request, res: Response) => {
    const { name, picture, description, productCategories, price } = req.body;
    if (!name || !picture || !description || !price) {
        return res.status(400).send("Missing fields");
    }
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

const updateProductController = async (req: Request, res: Response) => {
    const {
        name,
        picture,
        description,
        productCategories,
        price,
        isAvailable,
    } = req.body;
    if (
        !name &&
        !picture &&
        !description &&
        !productCategories &&
        !price &&
        !isAvailable
    ) {
        return res.status(400).send("Missing fields");
    }
    const { productId } = req.params;
    if (!productId) return res.status(400).send("Missing product id");
    const restaurant = await getRestaurantByUrl(
        req.session.restaurantUrl as string
    );
    if (!restaurant) return res.status(404).send("Restaurant not found");
    const product = await updateProductService({
        name,
        picture,
        description,
        productCategories,
        price,
        isAvailable,
        restaurant,
        productId,
    });
    if (!product) return res.status(400).send("Menu or product doesnt exist");
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
    const restaurant = await getRestaurantByUrl(
        req.session.restaurantUrl as string
    );
    if (!restaurant) return res.status(404).send("Restaurant not found");
    const products = await getFilteredProducts(
        category as string,
        parseInt(firstKPopular as string),
        restaurant
    );
    return res.status(200).send(products);
};

const deleteProductController = async (req: Request, res: Response) => {
    const { productId } = req.params;
    if (productId) {
        try {
            const result = await deleteProductById(productId);
            if (!result.acknowledged)
                return res.status(400).send("Invalid product id");
            return res.status(200).send(result);
        } catch (err) {
            return res.status(500).send("Error deleting product");
        }
    }
};

export {
    addProductController,
    updateProductController,
    getProductsController,
    deleteProductController,
};
