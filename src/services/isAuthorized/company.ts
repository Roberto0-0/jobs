import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const isCompanyAuthorized = (req: Request, res: Response, next: NextFunction) => {
    passport.authorize('company_jwt', { 
        session: false,
        failureRedirect: "/company/login",
        failureFlash: true
    }, async (err: any, company: any) => {
        if(err) { return next() }
        if(company) { 
            res.locals.company = company
            return next()
        }
        res.locals.company = company
        return next()
    })(req, res, next)
}
