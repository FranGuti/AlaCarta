import { Router } from "express";
import {
    changeUserInfoController,
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
    changeUserInfoValidation,
} from "../middlewares/authValidation";

const router = Router();

router.post("/login", loginValidation, loginController);

router.post("/register", registerValidation, registerController);

router.put(
    "/changeUserInfo",
    changeUserInfoValidation,
    changeUserInfoController
);

router.post(
    "/registerRestaurant",
    registerRestaurantValidation,
    registerRestaurantController
);

router.get("/logout", logoutController);

router.get("/session", sessionController);

export default router;
