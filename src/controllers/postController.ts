import { Request, Response } from "express"
import { PostCreate } from "../services/Post/create"
import { PostReadAll } from "../services/Post/readAll"
import { PostRead } from "../services/Post/read"
import { PostUpdate } from "../services/Post/update"
import { PostDelete } from "../services/Post/delete"
import { CompanyGetById } from "../services/Company/read"
import { GetPostByCompany } from "../services/Post/getPostByCompany"
import { postCreateSchema, postUpdateSchema } from "../schemas/postSchema"

var errorStorage: string[] = []

export class PostController {
  async createIndex(req: Request, res: Response) {
    const { company_id } = req.params
    
    var id = company_id

    try {
      const service = new CompanyGetById()
      const result = await service.execute(id)
    
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
    const { company_id } = req.params
    const { 
        vacancy, 
        salary, 
        vacancies, 
        location, 
        information } = req.body

    try {
      const postCreateSchemaResult = postCreateSchema.safeParse({
        company_id,
        vacancy,
        location,
        salary: Math.abs(salary),
        vacancies: Math.abs(vacancies),
        information
      })

      if(postCreateSchemaResult.success) {
        const postCreateService = new PostCreate()
        const postCreateResult = await postCreateService.execute(postCreateSchemaResult.data)

        if (postCreateResult instanceof Error) {
          errorStorage.push(postCreateResult.message)
          req.flash("error_message", errorStorage)
          return res.redirect("/post/create/" + company_id)
        }

        req.flash("success_message", postCreateResult.success_message)
        return res.redirect("/company/dashboard")
      } else {
        const err = postCreateSchemaResult.error.errors

        err.map((values) => { errorStorage.push(values.message) })
        
        req.flash("error_message", errorStorage)
        res.redirect("/post/create/" + company_id)
        errorStorage = []
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
    const option = req.query.option as string

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
        
        return res.render("post/update/index.ejs", { data: result })
     } catch(error) {
         console.error(error)
         return res.status(500).send({ message: "Internal server error!" })
     }
  }

  async update(req: Request, res: Response) {
    const { post_id, company_id } = req.params
    const { vacancy, salary, vacancies, information } = req.body

    try {
      const poostUpdateSchemaResult = postUpdateSchema.safeParse({
        post_id,
        company_id,
        vacancy,
        salary: Math.abs(salary),
        vacancies: Math.abs(vacancies),
        information
      })

      if(poostUpdateSchemaResult.success) {
        const service = new PostUpdate()
        const result = await service.execute(poostUpdateSchemaResult.data)

        if (result instanceof Error) {
          errorStorage.push(result.message)
          req.flash("error_message", errorStorage)
          res.redirect("/company/" + company_id)
          return errorStorage = []
        }

        req.flash("success_message", result.success_message)
        return res.redirect("/company/posts/" + company_id)
      } else {
        const err = poostUpdateSchemaResult.error.errors

        err.map((values) => { errorStorage.push(values.message) })
      }

      req.flash("error_message", errorStorage)
      res.redirect("/post/create/" + company_id)
      errorStorage = []
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

  async postAdjustments(req: Request, res: Response) {
    const { company_id } = req.params

    try {
      const getPostByCompanyService = new GetPostByCompany()
      const getPostByCompanyResult = await getPostByCompanyService.execute(company_id)

      if (getPostByCompanyResult instanceof Error) { return res.status(400).send({ message: getPostByCompanyResult.message }) }

      return res.render("post/settings/index.ejs", {
         data: getPostByCompanyResult
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: "Internal server error!" })
    }
  }

  async getPostByCompany(req: Request, res: Response) {
    const { post_id, company_id } = req.params

    try {
      const service = new PostRead()
      const result = await service.execute({
        post_id,
        company_id
      })

      if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

      res.render("post/getPostByCompany/index.ejs", {
        data: result
      })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
}
