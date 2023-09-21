import express, { Router } from "express"
import { CompanyController } from "../controllers/companyController"
import { PushController } from "../controllers/pushController"
import { PostController } from "../controllers/postController"
import { UserController } from "../controllers/userController"
import { HomeController } from "../controllers/homeController"
import { ResumeController } from "../controllers/resumeController"
import { ComplementController } from "../controllers/complementController"
import { isUserAuthenticated } from "../services/isAuthenticated/user"
import { isUserAuthorized } from "../services/isAuthorized/user"
import { isCompanyAuthenticated } from "../services/isAuthenticated/company"
import { isCompanyAuthorized } from "../services/isAuthorized/company"

export class AppRoutes {
  router: express.IRouter

  constructor() {
    this.router = Router()

    this.home()
    this.user()
    this.company()
    this.complement()
    this.post()
    this.resume()
    this.push()
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
    this.router.get("/profile", isUserAuthenticated, isUserAuthorized, new UserController().profile)
    this.router.get("/profile/account", isUserAuthenticated, isUserAuthorized, new UserController().accountDetails)
    this.router.get("/profile/settings/password", isUserAuthenticated, isUserAuthorized, new UserController().passwordUpdateIndex)
    this.router.post("/profile/settings/password/:user_id", new UserController().passwordUpdate)
    this.router.get("/dashboard", isUserAuthenticated, isUserAuthorized ,new UserController().dashboard)
    this.router.get("/login", new UserController().loginIndex)
    this.router.post("/login", new UserController().userLogin)
    this.router.get("/logout", new UserController().logout)
  }

  company() {
    this.router.get("/company/registration", new CompanyController().createIndex)
    this.router.post("/company/registration", new CompanyController().create)
    this.router.get("/company/showAll", isCompanyAuthenticated, isCompanyAuthorized, new CompanyController().readAll)
    this.router.get("/company/pushs/:company_id", isCompanyAuthenticated, isCompanyAuthorized, new CompanyController().showAllCompanyPush)
    this.router.get("/company/dashboard", isCompanyAuthenticated, isCompanyAuthorized, new CompanyController().dashboard)
    this.router.put("/company/update/:id", isCompanyAuthenticated, isCompanyAuthorized, new CompanyController().update)
    this.router.delete("/company/delete/:id", new CompanyController().delete)
    this.router.get("/company/login", new CompanyController().loginIndex)
    this.router.post("/company/login", new CompanyController().login)
  }

  complement() {
    this.router.get("/company/register/finish", isCompanyAuthenticated, isCompanyAuthorized, new ComplementController().createIndex)
    this.router.post("/company/register/finish/:company_id", new ComplementController().create)
    this.router.get("/complement/read/:complement_id/:company_id", isCompanyAuthenticated, isCompanyAuthorized, new ComplementController().read)
  }

  post() {
    this.router.get("/post/create/:company_id" ,isCompanyAuthenticated, isCompanyAuthorized, new PostController().createIndex)
    this.router.post("/post/create/:company_id", new PostController().create)
    this.router.get("/jobs", isUserAuthorized, new PostController().readAll)
    this.router.get("/post/show/:id", isCompanyAuthenticated, isCompanyAuthorized, new PostController().read)
    this.router.get("/post/update/:post_id/:company_id", isCompanyAuthenticated, isCompanyAuthorized, new PostController().updateIndex)
    this.router.post("/post/update/:post_id/:company_id", new PostController().update)
    this.router.get("/post/delete/:post_id/:company_id", isCompanyAuthenticated, isCompanyAuthorized, new PostController().delete)
    this.router.get("/company/posts/:company_id", isCompanyAuthenticated, isCompanyAuthorized, new PostController().postAdjustments)
    this.router.get("/company/post/:post_id/:company_id", isCompanyAuthenticated, isCompanyAuthorized, new PostController().getPostByCompany)
  }

  resume() {
    this.router.get("/resume/create/:post_id/:company_id", isUserAuthenticated, isUserAuthorized, new ResumeController().createIndex)
    this.router.post("/resume/create/:user_id/:post_id/:company_id", new ResumeController().create)
    this.router.get("/profile/resumes/:user_id", isUserAuthenticated, isUserAuthorized, new ResumeController().userCreatedResume)
    this.router.get("/resume/post/page/:post_id/:company_id", isUserAuthenticated, isUserAuthorized, new ResumeController().userResumeContent)
    this.router.get("/company/resume/:company_id", isCompanyAuthenticated, isCompanyAuthorized, new ResumeController().resumeSentCompany)
    this.router.get("/company/resume/page/:resume_id", isCompanyAuthenticated, isCompanyAuthorized, new ResumeController().resumeSentCompanyContent)
    this.router.get("/resume/delete/:user_id/:resume_id", isUserAuthenticated, isUserAuthorized, new ResumeController().delete)
    this.router.get("/resume/status/:resume_id/:user_id/:post_id", isUserAuthenticated, isUserAuthorized, new ResumeController().resumeStatus)
  }

  push() {
    this.router.get("/pushed/:user_id/:post_id/:company_id", isUserAuthenticated, isUserAuthorized, new PushController().pushed)
    this.router.get("/pushed/readAll/:company_id", isUserAuthenticated, isUserAuthorized, new PushController().read)
    this.router.get("/company/pushes/:company_id", isCompanyAuthenticated, isCompanyAuthorized, new PushController().read)
  }
}
