import { Request, Response } from "express"
import { Create } from "../services/User/create"
import { Delete } from "../services/User/delete"
import { UserRead } from "../services/User/read"
import { ReadAll } from "../services/User/readAll"
import { Update } from "../services/User/update"
import { userSchema } from "../schemas/userSchema"

var newErros: string[] = []

export class UserController { 
  createIndex(req: Request, res: Response) {
     res.render("user/register/index.ejs")
  }

  async create(req: Request, res: Response) {
    try {
      const validation = userSchema.safeParse(req.body)

      if(validation.success) {
        const service = new Create()
        const result = await service.execute(validation.data)

        if(result instanceof Error) {
            newErros.push(result.message)
            req.flash("error_message", result.message)
            return res.redirect("/register")
        }

        return res.redirect("/login")
      } else {
        const err = validation.error.errors

        err.map((values) => {
            newErros.push(values.message)
        })
      }

      req.flash("error_message", newErros)
      res.redirect("/register")
      newErros = []
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!"})
    }
  }

  async read(req: Request, res: Response) {
    const { id } = req.params

    try {
      const serivce = new UserRead()
      const result = await serivce.execute(id)

      if(result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send(result)
    } catch (error) {
      
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const serivce = new ReadAll()
      const result = await serivce.execute()

      return res.status(200).send(result)
    } catch (error) {
      
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, email, password } = req.body

    try {
      const service = new Update()
      const result = await service.execute({
        id,
        name,
        email,
        password
      })

      if(result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send({ message: "Account updated successfully!" })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const sercive = new Delete()
      const result = await sercive.execute(id)

      if(result instanceof Error) {
        return res.status(400).send({ messsage: result.message })
      }

      return res.status(200).send({ message: "Account deleted successfully!" })
    } catch (error) {
      
    }
  }
}
