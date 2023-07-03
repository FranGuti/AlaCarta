import { Request, Response, NextFunction } from "express";

const logRequests = (req: Request, res: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    res.on("finish", () => {
        console.log(`STATUS ${res.statusCode}`);
    });
    next();
};

export { logRequests };
