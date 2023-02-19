import { Request, Response } from "express"
import { Create } from "../services/Post/create"
import { ReadAll } from "../services/Post/readAll"
import { Read } from "../services/Post/read"
import { Update } from "../services/Post/update"
import { Delete } from "../services/Post/delete"
import { PostSchema } from "../schemas/postSchema"
import _ from "lodash"

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
    const { company_id } = req.params
    const { companyName, vancancy, location, salary, information } = req.body

    try {
      const { error, value } = PostSchema.validate({
        company_id,
        companyName,
        vancancy,
        location,
        salary,
        information
      })

      if(error) {
        return res.status(422).json({
          status: 'error',
          message: 'Invalid request data. Please review request and try again.',
          error: {
            details: _.map(error.details, ({message, type}) => ({
                message: message.replace(/['"]/g, ''),
                type
            }))
          }
        })
      }

      const service = new Create()
      const result = await service.execute(value)

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      /*return res.status(201).json({
        status: 'success',
        message: 'Post created successfully!',
        data: value
      })*/
      res.redirect("/dashboard")
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
  
  async updateIndex(req: Request, res: Request) {
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
    const { post_id, company_id } = req.params

    try {
      const service = new Delete()
      const result = await service.execute({
        post_id,
        company_id
      })

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      //return res.status(200).send({ message: "Post deleted successfully!" })
      res.redirect("/dashboard")
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
}
