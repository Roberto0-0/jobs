import { CompanyRepository } from "../../repositories/CompanyRepository";
import { PostRepository } from "../../repositories/PostRepository";

interface Attributes {
  post_id: string;
  company_id: string;
  company_name?: string;
  vacancy?: string;
  location?: string;
  salary?: number;
  vacancies?: number;
  information?: string;
}

interface IPost {
  company_name?: string;
  vacancy?: string;
  location?: string;
  salary?: number;
  vacancies?: number;
  information?: string;
}

let posts: IPost = {}

export class PostUpdate {
  async execute({
    post_id,
    company_id,
    company_name,
    vacancy,
    location,
    salary,
    vacancies,
    information
  }: Attributes) {
    const post = await PostRepository.findOneBy(({ id: post_id }))
    const company = await CompanyRepository.findOneBy({ id: company_id })

    if (!post) { return new Error("Post not found.") }
    if (!company) { return new Error("Company not found.") }
    
    posts = {
        company_name,
        vacancy,
        location,
        salary,
        vacancies,
        information
    }
    
    await PostRepository.update(post_id, posts)
    return { success_message: `"${posts.vacancy}" post has been updated` }
  }
}
