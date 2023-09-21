import { NextFunction, Request, Response } from "express"
import { UserCreate } from "../services/User/create"
import { UserDelete } from "../services/User/delete"
import { UserRead } from "../services/User/read"
import { UserReadAll } from "../services/User/readAll"
import { UserUpdate } from "../services/User/update"
import { UserUpdatePassword } from "../services/User/updatePassword"
import { userRegisterSchema } from "../schemas/userSchema"
import { updatePasswordSchema } from "../schemas/updatePasswordSchema"
import { UserLogin } from "../services/User/login"

var errorStorage: string[] = []

export class UserController { 
  createIndex(req: Request, res: Response) { res.render("user/register/index.ejs") }

  async create(req: Request, res: Response) {
    const { ...data } = req.body

    try {
      const userSchemaValidationResult = userRegisterSchema.safeParse(data)

      if(userSchemaValidationResult.success) {
        const userCreateService = new UserCreate()
        const userCreateResult = await userCreateService.execute(userSchemaValidationResult.data)

        if(userCreateResult instanceof Error) {
          errorStorage.push(userCreateResult.message)
          req.flash("error_message", userCreateResult.message)
          return res.redirect("/register")
        }

        return res.redirect("/login")
      } else {
        const err = userSchemaValidationResult.error.errors

        err.map((values) => { errorStorage.push(values.message) })
        
        req.flash("error_message", errorStorage)
        res.redirect("/register")
        errorStorage = []
      }
    } catch(error) {
      console.error(error)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error."
      })
    }
  }

  async getByid(req: Request, res: Response) {
    const { id } = req.params

    try {
      const userGetByIdService = new UserRead()
      const userGetByIdResult = await userGetByIdService.execute(id)

      if(userGetByIdResult instanceof Error) { return res.status(400).json({ message: userGetByIdResult.message }) }

      return res.status(200).json(userGetByIdResult)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error."
      })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const userGetAllService = new UserReadAll()
      const userGetAllResult = await userGetAllService.execute()

      if(userGetAllResult instanceof Error) { return res.status(400).json({ message: userGetAllResult.message }) }

      return res.status(200).json(userGetAllResult)
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error."
      })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const { ...data } = req.body

    data.id = id

    try {
      const userUpdateService = new UserUpdate()
      const userUpdateResult = await userUpdateService.execute(data)

      if(userUpdateResult instanceof Error) { return res.status(400).json({ message: userUpdateResult.message }) }

      return res.status(200).json({ message: "Account updated successfully." })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error."
      })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    try {
      const userDeleteService = new UserDelete()
      const userDeleteResult = await userDeleteService.execute(id)

      if(userDeleteResult instanceof Error) { return res.status(400).json({ messsage: userDeleteResult.message }) }

      return res.status(200).json({ message: "Account deleted successfully." })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error."
      })
    }
  }
  
  async profile(req: Request, res: Response) {
    try { return res.render("user/profile/layout/index.ejs") } catch(error) {
      console.error(error)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error."
      })
    }
  }

  async accountDetails(req: Request, res: Response) {
    try { res.render("user/profile/accountDetails/index.ejs") } catch(error) {
      console.error(error)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error."
      })
    }
  }

  async passwordUpdateIndex(req: Request, res: Response) {
    try { res.render("user/profile/passwordUpdate/index.ejs") } catch (error) {
      console.error(error)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error."
      })
    }
  }

  async passwordUpdate(req: Request, res: Response) {
    const { user_id } = req.params
    const { ...data } = req.body

    data.user_id = user_id

    try {
        const userUpdatePasswordSchemaResult = updatePasswordSchema.safeParse(data)

        if(userUpdatePasswordSchemaResult.success) {
            const service = new UserUpdatePassword()
            const result = await service.execute(userUpdatePasswordSchemaResult.data)
      
            if(result instanceof Error) { 
                errorStorage.push(result.message)
                req.flash("error_message", errorStorage)
                res.redirect("/profile/settings/password")
                return errorStorage = []
            }
      
            req.flash("success_message", "Successfully updated password.")
            res.redirect("/profile/settings/password")
        } else {
            const err = userUpdatePasswordSchemaResult.error.errors

            err.map((values) => { errorStorage.push(values.message) })
            
            req.flash("error_message", errorStorage)
            res.redirect("/profile/settings/password")
            errorStorage = []
        }
    } catch(error) {
      console.error(error)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error."
      })
    }
  }

  loginIndex(req: Request, res: Response) { return res.render("user/login/index.ejs") }
  
  userLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const userLoginSerice = new UserLogin()
      const userLoginResult = userLoginSerice.execute(req, res, next)

      return userLoginResult
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error."
      })
    }
  }

  logout(req: Request, res: Response, next: NextFunction) {
    req.logout((err) => {
      if(err) { return next(err) }
      res.clearCookie('user_payload')
      res.redirect("/")

      return
    })
  }
  
  dashboard(req: Request, res: Response) { return res.render("user/dashboard/index.ejs") }
}
