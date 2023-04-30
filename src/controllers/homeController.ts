import { Request, Response } from "express"

export class HomeController {
    index(req: Request, res: Response) {
        res.render("home/index.ejs")
    }
    
    about(req: Request, res: Response) {
        res.render("home/about/index.ejs")
    }
}