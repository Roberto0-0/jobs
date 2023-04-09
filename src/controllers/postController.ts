import { Request, Response } from "express"
import { Create } from "../services/Post/create"
import { ReadAll } from "../services/Post/readAll"
import { Read } from "../services/Post/read"
import { Update } from "../services/Post/update"
import { Delete } from "../services/Post/delete"

export class PostController {
  async createIndex(req: Request, res: Response) {
     const { company_id } = req.params
     
     try {
        res.render("post/create/index.ejs", {
           data: company_id
        })
     } catch(error) {
        console.error(error)
        return res.status(500).send({ message: "Internal server error" })
     }
  }
  async create(req: Request, res: Response) {
    const { user_id, company_id } = req.params
    const { companyName, vancancy, location, salary, information } = req.body

    try {
      const service = new Create()
      const result = await service.execute({
        company_id,
        companyName,
        vancancy,
        location,
        salary,
        information
      })

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      req.flash("success_message", "your post has been created!")
      res.redirect("/company/" + user_id + "/" + company_id)
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async read(req: Request, res: Response) {
    const { id } = req.params

    try {
      const service = new Read()
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
        const service = new Read()
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
    const { post_id, company_id } = req.params
    const { company_name, vancancy, location, salary, information } = req.body

    try {
      const service = new Update()
      const result = await service.execute({
        post_id,
        company_id,
        company_name,
        vancancy,
        location,
        salary,
        information
      })

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.redirect("/dashboard")
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

      req.flash("success_message", "your post has been deleted")
      res.redirect("/company/posts/" + user_id + "/" + company_id)
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
}
