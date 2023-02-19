import { Request, Response } from "express"
import { UserSchema } from "../schemas/userSchema"
import { Create } from "../services/User/create"
import { Delete } from "../services/User/delete"
import { Read } from "../services/User/read"
import { ReadAll } from "../services/User/readAll"
import { Update } from "../services/User/update"
import _ from "lodash"

export class UserController {
   
  createIndex(req: Request, res: Response) {
     res.render("user/register/index.ejs")
  }
  async create(req: Request, res: Response) {
    try {
      const {error, value} = UserSchema.validate(req.body)

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
      
      if(result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }
      
      /*return res.status(201).json({
        status: 'success',
        messag: 'Account created successfully!',
        data: value
      })*/
      res.redirect("/login")
    } catch(err) {
      console.error(err)
      return res.status(500).send({ message: "Internal server error!"})
    }
  }

  async read(req: Request, res: Response) {
    const { id } = req.params

    try {
      const serivce = new Read()
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
