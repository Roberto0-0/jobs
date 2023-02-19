import express, { NextFunction, Request, Response } from "express"
import bodyParser from "body-parser"
import session from "express-session"
import { Routes } from "../routes"
import flash from "connect-flash"
import path from "path"
import ejs from "ejs"
import passport from "passport"
import config from "../config/auth/index"
import "reflect-metadata"
import "dotenv/config"

config(passport)

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
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 1000 }
    }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())
    this.app.use(flash())
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.locals.error = req.flash("error")
      res.locals.user = req.user || null
      next()
    })

    this.app.use(express.static(path.join(__dirname, "..", "public")))
    this.app.set("views", path.join(__dirname, "..", "views"))
    this.app.engine("ejs", ejs.renderFile)
    this.app.set("views engine", "ejs")

    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())
  }

  routes() {
    this.app.use(new Routes().router)
  }
}
