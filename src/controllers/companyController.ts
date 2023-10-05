import { NextFunction, Request, Response } from "express"
import { CompanyCreate } from "../services/Company/create"
import { CompanyReadAll } from "../services/Company/readAll"
import { PushRead } from "../services/push/read"
import { CompanyUpdate } from "../services/Company/update"
import { CompanyDelete } from "../services/Company/delete"
import { companyRegisterSchema } from "../schemas/companySchema"
import { CompanyLogin } from "../services/Company/login"

var errorStorage: string[] = []

export class CompanyController {
  async createIndex(req: Request, res: Response) { res.render("company/create/index.ejs") }

  async create(req: Request, res: Response) {
    const { ...data } = req.body
     
    try {
      const companyRegisterSchemaResult = companyRegisterSchema.safeParse(data)
        
      if(companyRegisterSchemaResult.success) {
        const companyCreateService = new CompanyCreate()
        const companyCreateResult = await companyCreateService.execute(companyRegisterSchemaResult.data)
  
        if(companyCreateResult instanceof Error) {
            errorStorage.push(companyCreateResult.message)
            req.flash("error_message", companyCreateResult.message)
            return res.redirect("/company/registration")
        }
  
        return res.redirect("/company/login")
      } else {
        const err = companyRegisterSchemaResult.error.errors
        
        err.map((values) => { errorStorage.push(values.message) })

        req.flash("error_message", errorStorage)
        res.redirect("/company/registration")
        errorStorage = []
      }
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal server error." })
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const service = new CompanyReadAll()
      const result = await service.execute()

      if (result instanceof Error) {
        return res.status(400).json({ message: result.message })
      }

      return res.status(200).json(result)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error." })
    }
  }

  async update(req: Request, res: Response) {
    const { company_id } = req.params
    const { company_name, employer, email } = req.body

    try {
      const service = new CompanyUpdate()
      const result = await service.execute({
        company_id,
        company_name,
        employer,
        email
      })

      if (result instanceof Error) {
        return res.status(400).json({ message: result.message })
      }

      return res.status(200).json({ message: "Company updated successfully!" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal server error." })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const service = new CompanyDelete()
      const result = await service.execute(id)

      if (result instanceof Error) {
        return res.status(400).json({ message: result.message })
      }

      return res.status(200).json({ message: "Company deleted successfully!" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error." })
    }
  }

  async settings(req: Request, res: Response) { return res.render("company/settings/index.ejs") }
  async details(req: Request, res: Response) { return res.render("company/settings/details/index.ejs") }

  async loginIndex(req: Request, res: Response) { return res.render("company/login/index.ejs") }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const companyLoginService = new CompanyLogin()
      const companyLoginResult = await companyLoginService.execute(req, res, next)

      return companyLoginResult
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal server error." })
    }
  }

  async dashboard(req: Request, res: Response) { return res.render("company/dashboard/index.ejs") }
}
