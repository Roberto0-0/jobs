import { Post } from "../../database/entities/post";
import { PostRepository } from "../../repositories/PostRepository";

interface PostReadAttributes {
    post_id: string;
    company_id: string;
}

export class PostRead {
  async execute({ post_id, company_id }: PostReadAttributes): Promise<Post | Error> {
    const post = await PostRepository.findOne({
      where: { id: post_id, company_id: company_id },
      relations: { company: true, push: true }
    })

    if (!post) { return new Error("Post not found.") }

    return post
  }
}
