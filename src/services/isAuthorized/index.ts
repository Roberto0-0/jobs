import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const isAuthorized = (req: Request, res: Response, next: NextFunction) => {
    passport.authorize('jwt', { 
        session: false,
        failureRedirect: "/login",
        failureFlash: true
    }, async (err: any, user: any) => {
        if(err) { return next() }
        if(!user) { res.locals.user = user }
        res.locals.user = user
        return next()
    })(req, res, next)
}
