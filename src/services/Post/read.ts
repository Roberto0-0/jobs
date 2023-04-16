import { PostRepository } from "../../repositories/PostRepository";

export class Read {
  async execute(id: string) {
    const post = await PostRepository.findOne({
      where: { id: id },
      relations: {
        company: true,
        like: true
      }
    })

    if (!post) {
      return new Error("Post not fould!")
    }

    return post
  }
} 
