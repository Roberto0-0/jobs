import { CompanyRepository } from "../../repositories/CompanyRepository";
import { PostRepository } from "../../repositories/PostRepository";

export interface Attributes {
  company_id: string;
  companyName: string;
  vacancy: string;
  location: string;
  salary: number;
  vacancies: number;
  information?: string;
}

export class PostCreate {
  async execute({ 
    company_id, 
    companyName, 
    vacancy, 
    location, 
    salary, 
    vacancies, 
    information }: Attributes) {
    const company = await CompanyRepository.findOneBy({ id: company_id })

    if (!company) { return new Error("Company not found.") }

    const newPost = PostRepository.create({
      company_name: companyName,
      vacancy,
      location,
      salary,
      vacancies,
      information,
      company,
      company_id
    })
    await PostRepository.save(newPost)
    return { success_message: `"${newPost.vacancy}" post was created` }
  }
}
