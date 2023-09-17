import { NextFunction, Request, Response } from "express"
import passport from "passport"

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.user) { res.locals.user = req.user }
    passport.authenticate('jwt', { 
        session: false,
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
}
