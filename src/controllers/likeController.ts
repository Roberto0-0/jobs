import { Request, Response } from "express"
import { Like } from "../services/Like/index"
import { Read ,} from "../services/Post/read"

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
      
      const postService = new Read()
      const postResult = await postService.execute(result)
      
      if(postResult instanceof Error) {
          return res.status(400).send({ message : postResult.message })
      }

      return res.send(postResult)
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
}
