import { Request, Response } from "express"
import { PostRead } from "../services/Post/read"
import { ResumeCreate } from "../services/Resume/create"

export class ResumeController {    
      async createIndex(req: Request, res: Response) {
        const { post_id } = req.params
    
        try {
            const service = new PostRead()
            const result = await service.execute(post_id)
    
            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }
    
            return res.render("user/resume/create/index.ejs", {
                data: result
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })
        }
      }
    
      async create(req: Request, res: Response) {
        const { user_id, post_id } = req.params
        const { 
            fullName,
            dateOfBirth,
            maritalStatus,
            address,
            phone,
            academicEducation,
            information
         } = req.body

         try {
            const service = new ResumeCreate()
            const result = await service.execute({
                user_id,
                post_id,
                fullName,
                dateOfBirth,
                maritalStatus,
                address,
                phone,
                academicEducation,
                information
            })

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.status(201).send(result)
         } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })  
         }
      }

      async resumeList(req: Request, res: Response) {
        res.render("user/profile/curriculum/index.ejs")
      }
}