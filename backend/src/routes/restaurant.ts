import { Router } from "express";
import {
    addProductController,
    getProductsController,
} from "../controllers/products";
import { addProductValidation } from "../middlewares/productValidation";
import { getRestaurantController } from "../controllers/restaurant";
import { createMenuValidation } from "../middlewares/menuValidation";
import { createMenuController, getMenuController } from "../controllers/menu";

const router = Router();

// Restaurant
router.get("/", getRestaurantController);

// Menu
// TODO - Add menu validation so that only managers or owners can edit it, same with products
router.post("/createMenu", createMenuValidation, createMenuController);

router.get("/menu", getMenuController);

// Products
router.post("/addProduct", addProductValidation, addProductController);

router.get("/products", getProductsController);

router.get("/products/:productId", getProductsController);

export default router;
