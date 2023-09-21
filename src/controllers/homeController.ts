import { Request, Response } from "express"

export class HomeController {
    index(req: Request, res: Response) { res.render("layout/index.ejs") }
    about(req: Request, res: Response) { res.render("layout/about/index.ejs") }
}
