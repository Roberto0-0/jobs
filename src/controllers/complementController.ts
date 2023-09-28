import { Request, Response } from "express"
import { complementCreateSchema } from "../schemas/complementSchema"
import { ComplementCreate } from "../services/Complement/create"
import { ComplementRead } from "../services/Complement/read"

var errorStorage: string[] = []

export class ComplementController {
    async createIndex(req: Request, res: Response) { return res.render("complement/create/index.ejs") }

    async create(req: Request, res: Response) {
        const { company_id } = req.params
        const { sector, employees, location, description } = req.body

        try {
            const complementCreateSchemaResult = complementCreateSchema.safeParse({
                company_id,
                sector,
                employees: Math.abs(employees),
                location,
                description
            })

            if(complementCreateSchemaResult.success) {
                const complementCreateService = new ComplementCreate()
                const complementCreateResult = await complementCreateService.execute({
                    company_id,
                    sector,
                    employees: Math.abs(employees),
                    location,
                    description
                })

                if(complementCreateResult instanceof Error) {
                    errorStorage.push(complementCreateResult.message)
                    req.flash("error_message", complementCreateResult.message)
                    return res.status(400).json({ message: complementCreateResult.message })
                }

                req.flash("success_message", complementCreateResult.message)
                return res.redirect("/company/dashboard")

            } else {
                const err = complementCreateSchemaResult.error.errors

                err.map((values) => { errorStorage.push(values.message) })

                const { ...data } = req.body
                
                req.flash("error_message", [errorStorage, data])
                res.redirect("/company/register/finish")
                errorStorage = []
            }
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }

    async read(req: Request, res: Response) {
        const { complement_id, company_id } = req.params

        try {
            const complementReadService = new ComplementRead()
            const complementReadResult = await complementReadService.execute({ complement_id, company_id })

            if(complementReadResult instanceof Error) { return res.status(400).json({ message: complementReadResult.message }) }

            return complementReadResult
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }
}
