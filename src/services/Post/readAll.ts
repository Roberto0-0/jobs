import { PostRepository } from "../../repositories/PostRepository";

export class ReadAll {
  async execute() {
    const post = await PostRepository.find({
       order: {
          likes: "DESC"
       },
       relations: {
          like: true
       }
    })

    if (!post) {
      return new Error("Post not fould!")
    }

    return post
  }
}
