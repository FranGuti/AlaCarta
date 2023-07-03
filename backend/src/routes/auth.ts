import { Router } from "express";
import {
    loginController,
    logoutController,
    registerController,
    registerRestaurantController,
    sessionController,
} from "../controllers/auth";
import {
    loginValidation,
    registerValidation,
    registerRestaurantValidation,
} from "../middlewares/validation";

const router = Router();

router.post("/login", loginValidation, loginController);

router.post("/register", registerValidation, registerController);

router.post(
    "/registerRestaurant",
    registerRestaurantValidation,
    registerRestaurantController
);

router.get("/logout", logoutController);

router.get("/session", sessionController);

export default router;
