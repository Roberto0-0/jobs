import express, { Router, Request, Response } from "express"
import { CompanyController } from "../controllers/companyController"
import { LikeController } from "../controllers/likeController"
import { LoginController } from "../controllers/loginController"
import { PostController } from "../controllers/postController"
import { UserController } from "../controllers/userController"
import { HomeController } from "../controllers/homeController"
import { isAuth } from "../helpers/isAuth/index"

export class Routes {
  router: express.IRouter

  constructor() {
    this.router = Router()

    this.home()
    this.user()
    this.post()
    this.company()
    this.like()
    this.login()
  }

  home() {
    this.router.get("/", new HomeController().index)
    this.router.get("/about", new HomeController().about)
  }

  user() {
    this.router.get("/register", new UserController().createIndex)
    this.router.post("/user/register", new UserController().create)
    this.router.get("/user/show/:id", new UserController().read)
    this.router.get("/user/showAll", new UserController().readAll)
    this.router.put("/user/update/:id", new UserController().update)
    this.router.delete("/user/delete/:id", new UserController().delete)
    this.router.get("/profile", isAuth, new UserController().userProfile)
    this.router.get("/profile/account", isAuth, new UserController().accountInformation)
    this.router.get("/profile/settings/password", isAuth, new UserController().changePasswordIndex)
    this.router.get("/profile/resumes", isAuth, new UserController().resumeList)
    this.router.get("/create/resume", isAuth, new UserController().createResume)
    this.router.post("/profile/settings/password/:id", new UserController().changePassword)
  }

  post() {
    this.router.get("/post/create/:user_id/:company_id", isAuth, new PostController().createIndex)
    this.router.post("/post/create/:user_id/:company_id", new PostController().create)
    this.router.get("/jobs", new PostController().readAll)
    this.router.get("/post/show/:id", isAuth, new PostController().read)
    this.router.get("/post/update/:post_id/:company_id", isAuth, new PostController().updateIndex)
    this.router.post("/post/update/:post_id/:company_id/:user_id", new PostController().update)
    this.router.get("/post/delete/:post_id/:company_id/:user_id", new PostController().delete)
  }

  company() {
    this.router.get("/company/registration", isAuth, new CompanyController().createIndex)
    this.router.post("/company/registration/:user_id", new CompanyController().create)
    this.router.get("/company/showAll", isAuth, new CompanyController().readAll)
    this.router.get("/company/posts/:user_id/:company_id", isAuth, new CompanyController().CompanyPostAdjustments)
    this.router.get("/company/post/:post_id", isAuth, new CompanyController().showCompanyPost)
    this.router.get("/company/likes/:company_id", new CompanyController().showAllCompanyPush)
    this.router.get("/company/resumes", isAuth, new CompanyController().resumes)
    this.router.get("/company/resume/page", isAuth, new CompanyController().pageResume)
    this.router.get("/company/:user_id/:company_id", isAuth, new CompanyController().read)
    this.router.put("/company/update/:id", new CompanyController().update)
    this.router.delete("/company/delete/:id", new CompanyController().delete)
  }

  like() {
    this.router.get("/liked/:user_id/:post_id", new LikeController().liked)
  }

  login() {
    this.router.get("/dashboard", isAuth, new LoginController().dashboard)
    this.router.get("/login", new LoginController().loginIndex)
    this.router.post("/login", new LoginController().login)
    this.router.get("/logout", new LoginController().logout)
  }
}
