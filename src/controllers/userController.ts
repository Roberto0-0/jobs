import { Request, Response } from "express"
import { UserCreate } from "../services/User/create"
import { UserDelete } from "../services/User/delete"
import { UserRead } from "../services/User/read"
import { UserReadAll } from "../services/User/readAll"
import { UserUpdate } from "../services/User/update"
import { userSchema } from "../schemas/userSchema"

var newErrors: string[] = []

export class UserController { 
  createIndex(req: Request, res: Response) {
     res.render("user/register/index.ejs")
  }

  async create(req: Request, res: Response) {
    try {
      const validationResult = userSchema.safeParse(req.body)

      if(validationResult.success) {
        const service = new Create()
        const result = await service.execute(validationResult.data)

        if(result instanceof Error) {
            newErrors.push(result.message)
            req.flash("error_message", result.message)
            return res.redirect("/register")
        }

        return res.redirect("/login")
      }
      
      const err = validationResult.error.errors
      
      err.map((values) => {
        newErrors.push(values.message)
      })
    
      req.flash("error_message", newErrors)
      res.redirect("/register")
      newErrors = []
      
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
      const serivce = new UserReadAll()
      const result = await serivce.execute()

      return res.status(200).send(result)
    } catch (error) {
      
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { name, email, password } = req.body

    try {
      const service = new UserUpdate()
      const result = await service.execute({
        id,
        name,
        email,
        password
      })

      if(result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.status(200).send({ message: "Account updated successfully." })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const sercive = new UserDelete()
      const result = await sercive.execute(id)

      if(result instanceof Error) {
        return res.status(400).send({ messsage: result.message })
      }

      return res.status(200).send({ message: "Account deleted successfully." })
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
  
  async userProfile(req: Request, res: Response) {
    try {
      res.render("user/profile/home/index.ejs")
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }

  async accountInformation(req: Request, res: Response) {
    try {
      res.render("user/profile/accountInfo/index.ejs")
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }

  async changePasswordIndex(req: Request, res: Response) {
    try {
      res.render("user/profile/changePassword/index.ejs")
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }

  async changePassword(req: Request, res: Response) {
    const { id } = req.params
    const { currentPassword, newPassword, repeatNewPassword } = req.body

    try {
      const service = new UserUpdate()
      const result = await service.changePassword({
        id,
        currentPassword,
        newPassword,
        repeatNewPassword
      })

      if(result instanceof Error) { 
        newErrors.push(result.message)
        req.flash("error_message", newErrors)
        res.redirect("/profile/settings/password")
        return newErrors = []
       }

      req.flash("success_message", "Successfully updated password.")
      res.redirect("/profile/settings/password")
    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
}
