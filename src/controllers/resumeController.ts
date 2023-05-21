import { Request, Response } from "express"
import { PostRead } from "../services/Post/read"
import { ResumeCreate } from "../services/Resume/create"
import { ResumeRead } from "../services/Resume/read"
import { UserResume } from "../services/Resume/userResumes"
import { CompanyResume } from "../services/Resume/companyResumes"
import { ResumeDelete } from "../services/Resume/delete"

export class ResumeController {    
    async createIndex(req: Request, res: Response) {
        const { post_id, company_id } = req.params

        try {
            const service = new PostRead()
            const result = await service.execute({
                post_id,
                company_id
            })

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.render("resume/create/index.ejs", {
                data: result
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })
        }
    }
    
    async create(req: Request, res: Response) {
        const { user_id, post_id, company_id } = req.params
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
                company_id,
                fullName,
                dateOfBirth,
                maritalStatus,
                address,
                phone,
                academicEducation,
                information
            })

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            req.flash("success_message", result.success_message)
            return res.redirect("/resume/create/" + post_id + "/" + company_id)
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })  
        }
    }

      async read(req: Request, res: Response) {
        const { user_id } = req.params

        try {
            const service = new ResumeRead()
            const result = await service.execute(user_id)

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.render("user/profile/curriculum/index.ejs", {
                data: result
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })
        }
    }

    async delete(req: Request, res: Response) {
        const { user_id, resume_id } = req.params

        try {
            const service = new ResumeDelete()
            const result = await service.execute({ user_id, resume_id })

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            req.flash("success_message", result.success_message)
            return res.redirect("/profile/resumes/" + user_id)
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server errror." })
        }
    }

    async userResume(req: Request, res: Response) {
        const { user_id } = req.params

        try {
            const service = new UserResume()
            const result = await service.execute(user_id)

            if(result instanceof Error) { return { message: result.message } }

            return res.render("resume/userSentResumes/index.ejs", {
                data: result
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })
        }
    }

    async userResumePost(req: Request, res: Response) {
        const { post_id, company_id } = req.params

        try {
            const service = new PostRead()
            const result = await service.execute({ post_id, company_id })

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.render("resume/userResumePost/index.ejs", {
                data: result
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })
        }
    }

    async companyPostResume(req: Request, res: Response) {
        const { company_id } = req.params

        try {
            const service = new CompanyResume()
            const result = await service.execute(company_id)

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.render("resume/companyPostResume/index.ejs", {
                data: result
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async companyResume(req: Request, res: Response) {
        const { resume_id } = req.params

        try {
            const service = new ResumeRead()
            const result = await service.execute(resume_id)

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.render("resume/companyResumePage/index.ejs", {
                data: result
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })
        }
    }
}
