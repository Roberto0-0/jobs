import { Request, Response } from "express";
import { AddressCreate } from "../services/Address/create";

export class AddressController {
    createIndex(req: Request, res: Response) { return res.render("address/create/index.ejs") }

    async create(req: Request, res: Response) {
        const { user_id } = req.params
        const { ...data } = req.body

        data.user_id = user_id

        try {
            const addressCreateService = new AddressCreate()
            const addressCreateResponse = await addressCreateService.execute(data)

            if(addressCreateResponse instanceof Error) { 
                return res.status(400).json({ message: addressCreateResponse.message }) 
            }

            req.flash("success_message", "Successfully registered address.")
            return res.redirect("/address/register")
        } catch (error) {
            console.error(error)
            return res.status(500).json({ message: "Internal server error." })
        }
    }
}