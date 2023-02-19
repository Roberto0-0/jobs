import { CompanyRepository } from "../../repositories/CompanyRepository";
import { PostRepository } from "../../repositories/PostRepository";

interface Attributes {
  post_id: string;
  company_id: string;
}

export class Delete {
  async execute({ post_id, company_id }: Attributes) {
    const post = await PostRepository.findOneBy({ id: post_id })
    const company = await CompanyRepository.findOneBy({ id: company_id })

    if (!post) {
      return new Error("Post not fould!")
    }

    if (!company) {
      return new Error("Company not fould!")
    }

    await PostRepository.delete(post.id)
  }
}

