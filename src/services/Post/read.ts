import { CompanyRepository } from "../../repositories/CompanyRepository";
import { PostRepository } from "../../repositories/PostRepository";

interface Attributes {
    post_id: string;
    company_id: string;
}

export class PostRead {
  async execute({ post_id, company_id }: Attributes) {
    const company = await CompanyRepository.findOneBy({ id: company_id })
    const post = await PostRepository.findOne({
      where: { id: post_id, company_id: company_id },
      relations: {
        company: true,
        push: true
      }
    })

    if (!company) { return new Error("Company not found.") }
    if (!post) { return new Error("Post not found.") }
    return post
  }
} 
