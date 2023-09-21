import { CompanyRepository } from "../../repositories/CompanyRepository";
import { PostRepository } from "../../repositories/PostRepository";

interface postUpdateAttributes {
  post_id: string;
  company_id: string;
  vacancy?: string;
  salary?: number;
  vacancies?: number;
  information?: string;
}

interface IPost {
  vacancy?: string;
  salary?: number;
  vacancies?: number;
  information?: string;
}

let posts: IPost = {}

export class PostUpdate {
  async execute({ ...data }: postUpdateAttributes) {
    const post = await PostRepository.findOneBy(({ id: data.post_id }))
    const company = await CompanyRepository.findOneBy({ id: data.company_id })

    if (!post) { return new Error("Post not found.") }
    if (!company) { return new Error("Company not found.") }

    posts = {
        vacancy: data.vacancy,
        salary: data.salary,
        vacancies: data.vacancies,
        information: data.information
    }

    await PostRepository.update(data.post_id, posts)
    return { success_message: `"${posts.vacancy}" post has been updated` }
  }
}
