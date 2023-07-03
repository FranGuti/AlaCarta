import { Request, Response, NextFunction } from "express";

const addProductValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, picture, description, price } = req.body;
    if (!name || !picture || !description || !price) {
        return res.status(400).send("Missing fields");
    }
    next();
};

export { addProductValidation };
