import { PushRepository } from "../../repositories/PushRepository"
import { PostRepository } from "../../repositories/PostRepository"
import { UserRepository } from "../../repositories/UserRepository"
import { CompanyRepository } from "../../repositories/CompanyRepository"

interface Attributes {
  user_id: string;
  post_id: string;
  company_id: string;
}

export class Push {
  async execute({ user_id, post_id, company_id }: Attributes) {
    const user = await UserRepository.findOneBy({ id: user_id })
    const post = await PostRepository.findOneBy({ id: post_id })
    const company = await CompanyRepository.findOneBy({ id: company_id })
    const push = await PushRepository.findOne({
      where: {
        user_id: user_id,
        post_id: post_id
      },
      relations: { user: true }
    })

    if(!user) { return new Error("User not found.") }
    if(!post) { return new Error("Post not found.") }
    if(!company) { return new Error("Company not found.") }
    
    var newPushes = post.pushes
    if(!push) {
      const pushed = PushRepository.create({
        pushed: true,
        user_id,
        post_id,
        company_id,
        user,
        post,
        company
      })

      if(!pushed) { return new Error("Pushed not found.") }
    
      await PushRepository.save(pushed)
      await PostRepository.update(post_id, { pushes: newPushes += 1 })
    } else {
      if(push.pushed) {
        await PushRepository.update(push.id, { pushed: false })
        if(newPushes > 0) {
          await PostRepository.update(post_id, { pushes: newPushes -= 1 })
        } else if(newPushes <= 0) {
          await PostRepository.update(post_id, { pushes: 0 })
        }
      } else {
        await PushRepository.update(push.id, { pushed: true })
        await PostRepository.update(post_id,{ pushes: newPushes += 1 })
      }
    }
    return post.id
  }
}
