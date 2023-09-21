import express, { NextFunction, Request, Response } from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import session from "express-session"
import { AppRoutes } from "../routes"
import flash from "connect-flash"
import path from "path"
import ejs from "ejs"
import passport from "passport"

import "reflect-metadata"
import "dotenv/config"
import "../authenticate/index"

export class App {
  app: express.Application

  constructor() {
    this.app = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(session({
      secret: process.env.SESSION_SECRET as string | string[],
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 24 * 60 * 1000 }
    }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    this.app.use(flash())

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.success_message = req.flash("success_message")
      res.locals.error_message = req.flash("error_message")
      res.locals.error = req.flash("error")
      res.locals.user = req.user || null
      res.locals.company = req.user || null
      next()
    })

    this.app.use(express.static(path.join(__dirname, "..", "public")))
    this.app.set("views", path.join(__dirname, "..", "views"))
    this.app.engine("ejs", ejs.renderFile)
    this.app.set("views engine", "ejs")

    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
    this.app.use(cookieParser())
  }

  routes() { this.app.use(new AppRoutes().router) }
}
