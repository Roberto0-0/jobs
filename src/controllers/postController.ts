import { Request, Response } from "express"
import { PostCreate } from "../services/Post/create"
import { PostReadAll } from "../services/Post/readAll"
import { PostRead } from "../services/Post/read"
import { PostUpdate } from "../services/Post/update"
import { PostDelete } from "../services/Post/delete"
import { CompanyRead } from "../services/Company/read"
import { CompanyPost } from "../services/Post/companyPosts"
import { postSchema, updatePostSchema } from "../schemas/postSchema"

var newErrors: string[] = []

export class PostController {
  async createIndex(req: Request, res: Response) {
    const { user_id } = req.params
    
    try {
      const service = new CompanyRead()
      const result = await service.execute({ user_id })
    
      if(result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }
    
      res.render("post/create/index.ejs", { company: result })
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error" })
    }
  }
  
  async create(req: Request, res: Response) {
    const { user_id, company_id } = req.params
    const { 
        companyName, 
        vacancy, 
        salary, 
        vacancies, 
        location, 
        information } = req.body

    try {
      const validationResult = postSchema.safeParse({
        company_id,
        companyName,
        vacancy,
        location,
        salary: Math.abs(salary),
        vacancies: Math.abs(vacancies),
        information
      })

      if(validationResult.success) {
        const service = new PostCreate()
        const result = await service.execute(validationResult.data)

        if (result instanceof Error) {
          newErrors.push(result.message)
          req.flash("error_message", newErrors)
          return res.redirect("/company/" + user_id)
        }

        req.flash("success_message", result.success_message)
        return res.redirect("/company/" + user_id)
      } else {
        const err = validationResult.error.errors

        err.map((values) => {
          newErrors.push(values.message)
        })
        
        req.flash("error_message", newErrors)
        res.redirect("/post/create/" + user_id)
        newErrors = []
      }
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async read(req: Request, res: Response) {
    const { post_id, company_id } = req.params

    try {
      const service = new PostRead()
      const result = await service.execute({
        post_id,
        company_id
      })

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.render("company/posts/index.ejs", {
        data: result
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async readAll(req: Request, res: Response) {
    const { option } = req.query

    try {
      const service = new PostReadAll()
      const result = await service.execute(option)

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }
      
      return res.render("post/jobs/index.ejs", {
       data: result,
       lastOption: option
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
  
  async updateIndex(req: Request, res: Response) {
     const { post_id, company_id } = req.params
     
     try {
        const service = new PostRead()
        const result = await service.execute({
            post_id,
            company_id
        })
        
        if(result instanceof Error) { return res.status(404).send({ message: result.message }) }
        
        return res.render("post/update/index.ejs", {
           data: result,
           companyId: company_id
        })
     } catch(error) {
         console.error(error)
         return res.status(500).send({ message: "Internal server error!" })
     }
  }

  async update(req: Request, res: Response) {
    const { post_id, company_id } = req.params
    const { companyName, vacancy, location, salary, vacancies, information } = req.body

    try {
      const validation = updatePostSchema.safeParse({
        post_id,
        company_id,
        company_name: companyName,
        vacancy,
        location,
        salary: Math.abs(salary),
        vacancies: Math.abs(vacancies),
        information
      })

      if(validation.success) {
        const service = new PostUpdate()
        const result = await service.execute(validation.data)

        if (result instanceof Error) {
          newErrors.push(result.message)
          req.flash("error_message", newErrors)
          res.redirect("/company/" + company_id)
          return newErrors = []
        }

        req.flash("success_message", result.success_message)
        return res.redirect("/company/posts/" + company_id)
      } else {
        const err = validation.error.errors

        err.map((values) => {
          newErrors.push(values.message)
        })
      }

      req.flash("error_message", newErrors)
      res.redirect("/post/create/" + company_id)
      newErrors = []
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async delete(req: Request, res: Response) {
    const { post_id, company_id } = req.params

    try {
      const service = new PostDelete()
      const result = await service.execute({
        post_id,
        company_id
      })

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      req.flash("success_message", result.success_message)
      res.redirect("/company/posts/" + company_id)
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async CompanyPostAdjustments(req: Request, res: Response) {
    const { company_id } = req.params

    try {
      const service = new CompanyPost()
      const result = await service.execute(company_id)

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.render("post/settings/index.ejs", {
         data: result
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: "Internal server error!" })
    }
  }

  async showCompanyPost(req: Request, res: Response) {
    const { post_id, company_id } = req.params

    try {
      const service = new PostRead()
      const result = await service.execute({
        post_id,
        company_id
      })

      if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

      res.render("post/companyViewPost/index.ejs", {
        data: result
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
}
