import { NextFunction, Request, Response } from "express"
import passport from "passport"

export const isUserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('user_jwt', { 
        session: false,
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next)
}
