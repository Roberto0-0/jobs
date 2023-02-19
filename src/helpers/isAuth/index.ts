import { NextFunction, Request, Response } from "express";

export const isAuth = ((req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()) { return next() }
    //res.status(403).send({ message: "You need is authenticated" })
    res.redirect("/login")
})
