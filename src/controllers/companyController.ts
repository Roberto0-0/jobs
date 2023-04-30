import { Request, Response } from "express"
import { CompanyCreate } from "../services/Company/create"
import { CompanyReadAll } from "../services/Company/readAll"
import { CompanyRead } from "../services/Company/read"
import { LikeRead } from "../services/Like/read"
import { CompanyUpdate } from "../services/Company/update"
import { CompanyDelete } from "../services/Company/delete"
import { PostRead } from "../services/Post/read"
import { companySchema } from "../schemas/companySchema"

var newErrors: string[] = []

export class CompanyController {
  async createIndex(req: Request, res: Response) {
     try {
        res.render("company/create/index.ejs")
     } catch(error) {
        console.error(error)
        return res.status(500).send({ message: "Internal server error!"})
     }
  }
  async create(req: Request, res: Response) {
     const { user_id } = req.params
     const { employer, companyName, location, email, aboutCompany } = req.body
     
    try {
        const validationResult = companySchema.safeParse({
            user_id,
            employer,
            companyName,
            location,
            email,
            aboutCompany
        })
        
        if(validationResult.success) {
            const service = new CompanyCreate()
            const result = await service.execute(validationResult.data)
      
            if(result instanceof Error) {
                newErrors.push(result.message)
                req.flash("error_message", result.message)
                return res.redirect("/company/registration")
            }
      
            req.flash("success_message", result.success_message)
            res.redirect("/dashboard")
        }
        
        const err = validationResult.error.errors

        err.map((values) => {
            newErrors.push(values.message)
        })

        req.flash("error_message", newErrors)
        res.redirect("/company/registration")
        newErrors = []
        
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async read(req: Request, res: Response) {
    const { user_id, company_id } = req.params
    
    try {
      const service = new CompanyRead()
      const result = await service.execute({
         user_id,
         company_id
      })

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      var sum = 0
      for(var posts of result.post) {
        sum += posts.likes
      }

      return res.render("company/home/index.ejs", {
         data: result,
         userId: user_id,
         likes: sum
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: "Internal server error!" })
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const service = new CompanyReadAll()
      const result = await service.execute()

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send(result)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: "Internal server error." })
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
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send({ message: "Company updated successfully!" })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const service = new CompanyDelete()
      const result = await service.execute(id)

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send({ message: "Company deleted successfully!" })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: "Internal server error." })
    }
  }
  
  async CompanyPostAdjustments(req: Request, res: Response) {
    const { user_id, company_id } = req.params

    try {
      const service = new CompanyRead()
      const result = await service.execute({
         user_id,
         company_id
      })

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }
      
      return res.render("company/postsSettings/index.ejs", {
         data: result
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: "Internal server error!" })
    }
  }

  async showCompanyPost(req: Request, res: Response) {
    const { post_id } = req.params

    try {
      const service = new PostRead()
      const result = await service.execute(post_id)

      if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

      res.render("company/postsSettings/post/index.ejs", {
        data: result
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
  
  async showAllCompanyPush(req: Request, res: Response) {
        const { company_id } = req.params
      
        try {
          const service = new LikeRead()
          const result = await service.execute(company_id)
    
          if (result instanceof Error) {
            return res.status(400).send({ message: result.message })
          }
    
          return res.render("company/likes/index.ejs", {
             data: result
          })
        } catch (error) {
          console.error(error)
          return res.status(500).send({ message: "Internal server error." })
        }
    }
}
