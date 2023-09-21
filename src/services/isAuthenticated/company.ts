import { NextFunction, Request, Response } from "express"
import passport from "passport"

export const isCompanyAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('company_jwt', { 
        session: false,
        failureRedirect: "/company/login",
        failureFlash: true
    })(req, res, next)
}
