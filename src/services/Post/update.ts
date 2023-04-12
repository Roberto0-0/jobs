import { CompanyRepository } from "../../repositories/CompanyRepository";
import { PostRepository } from "../../repositories/PostRepository";

interface Attributes {
  post_id: string;
  company_id: string;
  company_name?: string;
  vancancy?: string;
  location?: string;
  salary?: number;
  vacancies?: number;
  information?: string;
}

interface IPost {
  company_name?: string;
  vancancy?: string;
  location?: string;
  salary?: number;
  vacancies?: number;
  information?: string;
}

let posts: IPost = {}

export class Update {
  async execute({
    post_id,
    company_id,
    company_name,
    vancancy,
    location,
    salary,
    vacancies,
    information
  }: Attributes) {

    console.log(company_name)
    const post = await PostRepository.findOneBy(({ id: post_id }))
    const company = await CompanyRepository.findOneBy({ id: company_id })

    if (!post) {
      return new Error("Post not fould!")
    }

    if (!company) {
      return new Error("Company not fould!")
    }

    if (company_name == null || company_name == undefined) {
      posts = {
        company_name,
        vancancy,
        location,
        salary,
        vacancies,
        information
      }

      await PostRepository.update(
        post_id,
        posts
      )
    } else {
      const company_name_check = await CompanyRepository.findOne({
        where: { id: company_id, company: company_name }
      })

      if (!company_name_check) {
        return new Error("Invalid company name!")
      }

      posts = {
        company_name,
        vancancy,
        location,
        salary,
        vacancies,
        information
      }

      await PostRepository.update(
        post_id,
        posts
      )
    }
  }
}
