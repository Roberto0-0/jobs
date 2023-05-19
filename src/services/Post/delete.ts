import { CompanyRepository } from "../../repositories/CompanyRepository";
import { PostRepository } from "../../repositories/PostRepository";

interface Attributes {
  post_id: string;
  company_id: string;
}

export class PostDelete {
  async execute({ post_id, company_id }: Attributes) {
    const post = await PostRepository.findOneBy({ id: post_id })
    const company = await CompanyRepository.findOneBy({ id: company_id })

    if (!post) { return new Error("Post not found.") }
    if (!company) { return new Error("Company not found.") }

    await PostRepository.delete(post.id)
    return { success_message: `"${post.vancancy}" post has been deleted.` }
  }
}
