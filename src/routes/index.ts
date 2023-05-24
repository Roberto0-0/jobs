import express, { Router, Request, Response } from "express"
import { CompanyController } from "../controllers/companyController"
import { PushController } from "../controllers/pushController"
import { LoginController } from "../controllers/loginController"
import { PostController } from "../controllers/postController"
import { UserController } from "../controllers/userController"
import { HomeController } from "../controllers/homeController"
import { ResumeController } from "../controllers/resumeController"
import { isAuth } from "../helpers/isAuth/index"

export class Routes {
  router: express.IRouter

  constructor() {
    this.router = Router()

    this.home()
    this.user()
    this.post()
    this.company()
    this.push()
    this.login()
    this.resume()
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
    this.router.get("/profile/account", isAuth, new UserController().accountDetails)
    this.router.get("/profile/settings/password", isAuth, new UserController().changePasswordIndex)
    this.router.post("/profile/settings/password/:id", new UserController().changePassword)
  }

  post() {
    this.router.get("/post/create/:user_id", isAuth, new PostController().createIndex)
    this.router.post("/post/create/:user_id/:company_id", new PostController().create)
    this.router.get("/jobs", new PostController().readAll)
    this.router.get("/post/show/:id", isAuth, new PostController().read)
    this.router.get("/post/update/:post_id/:company_id", isAuth, new PostController().updateIndex)
    this.router.post("/post/update/:post_id/:company_id", new PostController().update)
    this.router.get("/post/delete/:post_id/:company_id", new PostController().delete)
    this.router.get("/company/posts/:company_id", isAuth, new PostController().CompanyPostAdjustments)
    this.router.get("/company/post/:post_id/:company_id", isAuth, new PostController().showCompanyPost)
  }

  company() {
    this.router.get("/company/registration", isAuth, new CompanyController().createIndex)
    this.router.post("/company/registration/:user_id", new CompanyController().create)
    this.router.get("/company/showAll", new CompanyController().readAll)
    this.router.get("/company/pushs/:company_id", new CompanyController().showAllCompanyPush)
    this.router.get("/company/:user_id", isAuth, new CompanyController().read)
    this.router.put("/company/update/:id", new CompanyController().update)
    this.router.delete("/company/delete/:id", new CompanyController().delete)
  }

  push() {
    this.router.get("/pushed/:user_id/:post_id/:company_id", new PushController().pushed)
    this.router.get("/pushed/readAll/:company_id", new PushController().read)
    this.router.get("/company/pushes/:company_id", isAuth, new PushController().read)
  }

  login() {
    this.router.get("/dashboard", isAuth, new LoginController().dashboard)
    this.router.get("/login", new LoginController().loginIndex)
    this.router.post("/login", new LoginController().login)
    this.router.get("/logout", new LoginController().logout)
  }

  resume() {
    this.router.get("/resume/create/:post_id/:company_id", isAuth, new ResumeController().createIndex)
    this.router.post("/resume/create/:user_id/:post_id/:company_id", new ResumeController().create)
    this.router.get("/profile/resumes/:user_id", isAuth, new ResumeController().userResume)
    this.router.get("/resume/post/page/:post_id/:company_id", isAuth, new ResumeController().userResumePost)
    this.router.get("/company/resume/:company_id", isAuth, new ResumeController().companyPostResume)
    this.router.get("/company/resume/page/:resume_id", isAuth, new ResumeController().companyResume)
    this.router.get("/resume/delete/:user_id/:resume_id", isAuth, new ResumeController().delete)
  }
}
