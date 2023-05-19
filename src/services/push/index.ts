import { PushRepository } from "../../repositories/PushRepository"
import { PostRepository } from "../../repositories/PostRepository"
import { UserRepository } from "../../repositories/UserRepository"

interface Attributes {
  user_id: string;
  post_id: string;
}

export class Push {
  async execute({ user_id, post_id }: Attributes) {
    const user = await UserRepository.findOneBy({ id: user_id })
    const post = await PostRepository.findOneBy({ id: post_id })
    const like = await PushRepository.findOne({
      where: {
        user_id: user_id,
        post_id: post_id
      }
    })

    if (!user) { return new Error("User not found!") }
    if (!post) { return new Error("Post not found!") }
    
    var newpushes = post.pushes
    if (!like) {
      const pushed = PushRepository.create({
        pushed: true,
        user_id,
        post_id,
        user,
        post
    })
    
    await PushRepository.save(pushed)
    await PostRepository.update(
        post_id,
        { pushes: newpushes += 1 }
    )
    } else {
      if (like.pushed) {
        await PushRepository.update(
          like.id,
          { pushed: false }
        )
        if (newpushes > 0) {
          await PostRepository.update(
            post_id,
            { pushes: newpushes -= 1 }
          )
        } else if (newpushes <= 0) {
          await PostRepository.update(
            post_id,
            { pushes: 0 }
          )
        }
      } else {
        await PushRepository.update(
          like.id,
          { pushed: true }
        )
        await PostRepository.update(
          post_id,
          { pushes: newpushes += 1 }
        )
      }
    }
    
    return post.id
  }
}
