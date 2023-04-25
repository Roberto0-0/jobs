import { Request, Response } from "express"
import { Create } from "../services/Post/create"
import { ReadAll } from "../services/Post/readAll"
import { PostRead } from "../services/Post/read"
import { Update } from "../services/Post/update"
import { Delete } from "../services/Post/delete"
import { CompanyRead } from "../services/Company/read"
import { postSchema, updatePostSchema } from "../schemas/postSchema"

var newErrors: string[] = []

export class PostController {
  async createIndex(req: Request, res: Response) {
     const { user_id, company_id } = req.params
     
     try {
        const service = new CompanyRead()
        const result = await service.execute({
          user_id,
          company_id
        })

        if(result instanceof Error) {
          return res.status(400).send({ message: result.message })
        }

        res.render("post/create/index.ejs", {
           data: company_id,
           company: result
        })
     } catch(error) {
        console.error(error)
        return res.status(500).send({ message: "Internal server error" })
     }
  }
  async create(req: Request, res: Response) {
    const { user_id, company_id } = req.params
    const { companyName, vancancy, salary, vacancies, location, information } = req.body

    try {
      const validation = postSchema.safeParse({
        company_id,
        companyName,
        vancancy,
        location,
        salary: Math.abs(salary),
        vacancies: Math.abs(vacancies),
        information
      })

      if(validation.success) {
        const service = new Create()
        const result = await service.execute(validation.data)

        if (result instanceof Error) {
          newErrors.push(result.message)
          req.flash("error_message", newErrors)
          return res.redirect("/company/" + user_id + "/" + company_id)
        }

        req.flash("success_message", result.success_message)
        return res.redirect("/company/" + user_id + "/" + company_id)
      } else {
        const err = validation.error.errors

        err.map((values) => {
          newErrors.push(values.message)
        })
      }

      req.flash("error_message", newErrors)
      res.redirect("/post/create/" + user_id + "/" + company_id)
      newErrors = []
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async read(req: Request, res: Response) {
    const { id } = req.params

    try {
      const service = new PostRead()
      const result = await service.execute(id)

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
    try {
      const service = new ReadAll()
      const result = await service.execute()

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }
      
      return res.render("post/jobs/index.ejs", {
         data: result
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
        const result = await service.execute(post_id)
        
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
    const { post_id, company_id, user_id } = req.params
    const { companyName, vancancy, location, salary, vacancies, information } = req.body

    try {
      const validation = updatePostSchema.safeParse({
        post_id,
        company_id,
        company_name: companyName,
        vancancy,
        location,
        salary: Math.abs(salary),
        vacancies: Math.abs(vacancies),
        information
      })

      if(validation.success) {
        const service = new Update()
        const result = await service.execute(validation.data)

        if (result instanceof Error) {
          newErrors.push(result.message)
          req.flash("error_message", newErrors)
          res.redirect("/company/" + user_id + "/" + company_id)
          return newErrors = []
        }

        req.flash("success_message", result.success_message)
        return res.redirect("/company/posts/" + user_id + "/" + company_id)
      } else {
        const err = validation.error.errors

        err.map((values) => {
          newErrors.push(values.message)
        })
      }

      req.flash("error_message", newErrors)
      res.redirect("/post/create/" + user_id + "/" + company_id)
      newErrors = []
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async delete(req: Request, res: Response) {
    const { post_id, company_id, user_id } = req.params

    try {
      const service = new Delete()
      const result = await service.execute({
        post_id,
        company_id
      })

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      req.flash("success_message", result.success_message)
      res.redirect("/company/posts/" + user_id + "/" + company_id)
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
}
