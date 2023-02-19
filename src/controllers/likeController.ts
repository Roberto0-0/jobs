import { Request, Response } from "express"
import { Like } from "../services/Like/index"

export class LikeController {
  async liked(req: Request, res: Response) {
    const { user_id, post_id } = req.params

    try {
      const service = new Like()
      const result = await service.execute(({
        user_id,
        post_id
      }))

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }

      return res.redirect("/jobs")
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
}
