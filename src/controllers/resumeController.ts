import { Request, Response } from "express"
import { PostRead } from "../services/Post/read"
import { ResumeCreate } from "../services/Resume/create"
import { ResumeRead } from "../services/Resume/read"
import { UserResume } from "../services/Resume/userResumes"
import { CompanyResume } from "../services/Resume/companyResumes"
import { ResumeDelete } from "../services/Resume/delete"
import { ResumeStatus } from "../services/Resume/resumeResult"

var newErrors = []

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
        const { information } = req.body

        try {
            const service = new ResumeCreate()
            const result = await service.execute({
                user_id,
                post_id,
                company_id,
                information
            })

            if(result instanceof Error) { 
                newErrors.push(result.message)
                req.flash("error_message", result.message)
                return res.redirect("/resume/create/" + post_id + "/" + company_id)
            }

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

    async userCreatedResume(req: Request, res: Response) {
        const { user_id } = req.params

        try {
            const service = new UserResume()
            const result = await service.execute(user_id)

            if(result instanceof Error) { return { message: result.message } }

            return res.render("resume/userCreatedResume/index.ejs", {
                data: result
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })
        }
    }

    async userResumeContent(req: Request, res: Response) {
        const { post_id, company_id } = req.params

        try {
            const service = new PostRead()
            const result = await service.execute({ post_id, company_id })

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.render("resume/userCreatedResume/resumeContent/index.ejs", {
                data: result
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })
        }
    }

    async resumeSentCompany(req: Request, res: Response) {
        const { company_id } = req.params

        try {
            const service = new CompanyResume()
            const result = await service.execute(company_id)

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.render("resume/resumeSentCompany/index.ejs", {
                data: result,
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error" })
        }
    }

    async resumeSentCompanyContent(req: Request, res: Response) {
        const { resume_id } = req.params

        try {
            const service = new ResumeRead()
            const result = await service.execute(resume_id)

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            return res.render("resume/resumeSentCompany/resumeContent/index.ejs", {
                data: result
            })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })
        }
    }

    async resumeStatus(req: Request, res: Response) {
        const { resume_id, user_id, post_id } = req.params
        const { option } = req.query

        if(!option) { return res.status(404).send({ message: "Option not found." }) }
        if (typeof option !== "string") { return res.status(500).send({ message: 'Invalid dataset' }) }

        try {
            const service = new ResumeStatus()
            const result = await service.execute({ 
                resume_id,
                user_id, 
                post_id,
                option
            })

            if(result instanceof Error) { return res.status(400).send({ message: result.message }) }

            req.flash("success_message", result.successMessage)
            return res.redirect("/company/resume/" + result.company_id)
        } catch (error) {
            console.error(error)
            return res.status(500).send({ message: "Internal server error." })
        }
    }
}
