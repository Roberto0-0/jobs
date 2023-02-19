import { NextFunction, Request, Response } from "express";
import passport from "passport"

export class LoginController {
   
  loginIndex(req: Request, res: Response) {
     res.render("user/login/index.ejs")
  }
  login(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/login",
      failureFlash: true
    })(req, res, next)
  }

  logout(req: Request, res: Response, next: NextFunction) {
    req.logout(function(err) {
      if(err) { return next(err) }
      //res.status(200).send({ message: "logout!" })
      res.redirect("/")
    })
  }
  
  dashboard(req: Request, res: Response) {
     res.render("user/dashboard/index.ejs")
  }
}