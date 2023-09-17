import express, { Router } from "express"
import { CompanyController } from "../controllers/companyController"
import { PushController } from "../controllers/pushController"
import { PostController } from "../controllers/postController"
import { UserController } from "../controllers/userController"
import { HomeController } from "../controllers/homeController"
import { ResumeController } from "../controllers/resumeController"
import { isAuthenticated } from "../services/isAuthenticated/index"
import { isAuthorized } from "../services/isAuthorized"

export class AppRoutes {
  router: express.IRouter

  constructor() {
    this.router = Router()

    this.home()
    this.user()
    this.post()
    this.company()
    this.push()
    this.resume()
  }

  home() {
    this.router.get("/", new HomeController().index)
    this.router.get("/about", new HomeController().about)
  }

  user() {
    this.router.get("/register", new UserController().createIndex)
    this.router.post("/user/register", new UserController().create)
    this.router.get("/user/show/:id", new UserController().getByid)
    this.router.get("/user/showAll", new UserController().getAll)
    this.router.put("/user/update/:id", new UserController().update)
    this.router.delete("/user/delete/:id", new UserController().delete)
    this.router.get("/profile", isAuthenticated, isAuthorized, new UserController().profile)
    this.router.get("/profile/account", isAuthenticated, isAuthorized, new UserController().accountDetails)
    this.router.get("/profile/settings/password", isAuthenticated, isAuthorized, new UserController().updatePasswordIndex)
    this.router.post("/profile/settings/password/:user_id", new UserController().updatePassword)
    this.router.get("/dashboard", isAuthenticated, isAuthorized ,new UserController().dashboard)
    this.router.get("/login", new UserController().loginIndex)
    this.router.post("/login", new UserController().login)
    this.router.get("/logout", new UserController().logout)
  }

  post() {
    this.router.get("/post/create/:user_id" ,isAuthenticated, isAuthorized, new PostController().createIndex)
    this.router.post("/post/create/:user_id/:company_id", new PostController().create)
    this.router.get("/jobs", isAuthorized, new PostController().readAll)
    this.router.get("/post/show/:id", isAuthenticated, isAuthorized, new PostController().read)
    this.router.get("/post/update/:post_id/:company_id", isAuthenticated, isAuthorized, new PostController().updateIndex)
    this.router.post("/post/update/:post_id/:company_id", new PostController().update)
    this.router.get("/post/delete/:post_id/:company_id", isAuthenticated, isAuthorized, new PostController().delete)
    this.router.get("/company/posts/:company_id", isAuthenticated, isAuthorized, new PostController().CompanyPostAdjustments)
    this.router.get("/company/post/:post_id/:company_id", isAuthenticated, isAuthorized, new PostController().showCompanyPost)
  }

  company() {
    this.router.get("/company/registration", isAuthenticated, isAuthorized, new CompanyController().createIndex)
    this.router.post("/company/registration/:user_id", new CompanyController().create)
    this.router.get("/company/showAll", isAuthenticated, isAuthorized, new CompanyController().readAll)
    this.router.get("/company/pushs/:company_id", isAuthenticated, isAuthorized, new CompanyController().showAllCompanyPush)
    this.router.get("/company/:user_id", isAuthenticated, isAuthorized, isAuthenticated, new CompanyController().read)
    this.router.put("/company/update/:id", isAuthenticated, isAuthorized, new CompanyController().update)
    this.router.delete("/company/delete/:id", new CompanyController().delete)
  }

  push() {
    this.router.get("/pushed/:user_id/:post_id/:company_id", isAuthenticated, isAuthorized, new PushController().pushed)
    this.router.get("/pushed/readAll/:company_id", isAuthenticated, isAuthorized, new PushController().read)
    this.router.get("/company/pushes/:company_id", isAuthenticated, isAuthorized, new PushController().read)
  }

  resume() {
    this.router.get("/resume/create/:post_id/:company_id", isAuthenticated, isAuthorized, new ResumeController().createIndex)
    this.router.post("/resume/create/:user_id/:post_id/:company_id", new ResumeController().create)
    this.router.get("/profile/resumes/:user_id", isAuthenticated, isAuthorized, new ResumeController().userResume)
    this.router.get("/resume/post/page/:post_id/:company_id", isAuthenticated, isAuthorized, new ResumeController().userResumePost)
    this.router.get("/company/resume/:company_id", isAuthenticated, isAuthorized, new ResumeController().companyPostResume)
    this.router.get("/company/resume/page/:resume_id", isAuthenticated, isAuthorized, new ResumeController().companyResume)
    this.router.get("/resume/delete/:user_id/:resume_id", isAuthenticated, isAuthorized, new ResumeController().delete)
    this.router.get("/resume/status/:resume_id/:user_id/:post_id", isAuthenticated, isAuthorized, new ResumeController().resumeStatus)
  }
}
