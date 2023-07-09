import { Router } from "express";
import {
    addProductController,
    deleteProductController,
    getProductsController,
    updateProductController,
} from "../controllers/products";
import {
    addOrUpdateProductValidation,
    createOrUpdateMenuValidation,
    deleteEmployeeValidation,
    deleteOrUpdateRestaurantValidation,
    deleteProductValidation,
    getOrderStatisticsValidation,
} from "../middlewares/restaurantValidation";
import {
    deleteEmployeeController,
    deleteRestaurantController,
    getEmployeesController,
    getRestaurantController,
    updateEmployeeController,
    updateRestaurantController,
} from "../controllers/restaurant";
import {
    createMenuController,
    getMenuController,
    updateMenuController,
} from "../controllers/menu";
import {
    addOrderController,
    getOrderStatisticsController,
    getOrdersController,
    updateOrderStatusController,
} from "../controllers/orders";

const router = Router();

// Restaurant
router.get("/", getRestaurantController);

router.put("/", deleteOrUpdateRestaurantValidation, updateRestaurantController);

router.delete(
    "/",
    deleteOrUpdateRestaurantValidation,
    deleteRestaurantController
);

// Menu
router.post("/menu", createOrUpdateMenuValidation, createMenuController);

router.put("/menu", createOrUpdateMenuValidation, updateMenuController);

router.get("/menu", getMenuController);

// Products
router.post("/products", addOrUpdateProductValidation, addProductController);

router.get("/products", getProductsController);

router.get("/products/:productId", getProductsController);

router.put(
    "/products/:productId",
    addOrUpdateProductValidation,
    updateProductController
);

router.delete(
    "/products/:productId",
    deleteProductValidation,
    deleteProductController
);

// Orders
router.post("/orders", addOrderController);

router.put("/orders/:orderId", updateOrderStatusController);

router.get("/orders", getOrdersController);

// Order Statistics

router.get(
    "/orders/statistics",
    getOrderStatisticsValidation,
    getOrderStatisticsController
);

router.get(
    "/orders/statistics/:productId",
    getOrderStatisticsValidation,
    getOrderStatisticsController
);

// Employees
router.get("/employees", getEmployeesController);

router.put(
    "/employees/:employeeId",
    deleteOrUpdateRestaurantValidation,
    updateEmployeeController
);

router.delete(
    "/employees/:employeeId",
    deleteEmployeeValidation,
    deleteEmployeeController
);

export default router;
