import { Request, Response } from "express"
import { Create } from "../services/Company/create"
import { ReadAll } from "../services/Company/readAll"
import { CompanyRead } from "../services/Company/read"
import { LikeRead } from "../services/Like/read"
import { Update } from "../services/Company/update"
import { Delete } from "../services/Company/delete"

export class CompanyController {
  async createIndex(req: Request, res: Response) {
     const { id } = req.params
     
     try {
        res.render("company/create/index.ejs", {
           UserId: id
        })
     } catch(error) {
        console.error(error)
        return res.status(500).send({ message: "Internal server error!"})
     }
  }
  async create(req: Request, res: Response) {
     const { id } = req.params
     const { employer, companyName, location,  email } = req.body
     
    try {
      const service = new Create()
      const result = await service.execute({
        id,
        employer,
        companyName,
        location,
        email
      })
      
      if(result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }
      
      res.redirect("/dashboard")
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
  
  async posts(req: Request, res: Response) {
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


      return res.render("company/posts/index.ejs", {
         data: result
      })
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: "Internal server error!" })
    }
  }
  
  async likes(req: Request, res: Response) {
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
          res.status(500).send({ message: "Internal server error!" })
        }
    }

  async readAll(req: Request, res: Response) {
    try {
      const service = new ReadAll()
      const result = await service.execute()

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send(result)
    } catch (error) {

    }
  }

  async update(req: Request, res: Response) {
    const { company_id } = req.params
    const { company_name, employer, email } = req.body

    try {
      const service = new Update()
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
      const service = new Delete()
      const result = await service.execute(id)

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send({ message: "Company deleted successfully!" })
    } catch (error) {

    }
  }
}

