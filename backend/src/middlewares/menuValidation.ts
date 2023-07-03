import { Request, Response, NextFunction } from "express";

const createMenuValidation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { banner, color } = req.body;
    if (!banner || !color) {
        return res.status(400).send("Missing fields");
    }
    next();
};

export { createMenuValidation };
