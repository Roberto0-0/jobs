import { Request, Response } from "express"
import { Push } from "../services/push/index"
import { PushRead } from "../services/push/read"
import { PostRead ,} from "../services/Post/read"

export class PushController {
  async pushed(req: Request, res: Response) {
    const { user_id, post_id, company_id } = req.params

    try {
      const service = new Push()
      const result = await service.execute(({
        user_id,
        post_id,
        company_id
      }))

      if (result instanceof Error) {
        return res.status(400).send({ message: result.message })
      }
      
      const postService = new PostRead()
      const postResult = await postService.execute({ 
        post_id: result,
        company_id
       })

      if(postResult instanceof Error) {
          return res.status(400).send({ message : postResult.message })
      }

      return res.send(postResult)
    } catch (error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error!" })
    }
  }
  
  async read(req: Request, res: Response) {
    const { company_id } = req.params
    
    try {
      const service = new PushRead()
      const result = await service.execute(company_id)

      if(result instanceof Error) { return res.status(400).send({ message : result.message }) }
      return res.render("company/push/index.ejs", {
        data: result
      })

    } catch(error) {
      console.error(error)
      return res.status(500).send({ message: "Internal server error." })
    }
  }
}
