import { CompanyRepository } from "../../repositories/CompanyRepository";
import { PostRepository } from "../../repositories/PostRepository";

export interface Attributes {
  company_id: string;
  companyName: string;
  vancancy: string;
  location: string;
  salary: number;
  vacancies: number;
  information?: string;
}

export class Create {
  async execute({ company_id, companyName, vancancy, location, salary, vacancies, information }: Attributes) {
    const company = await CompanyRepository.findOneBy({ id: company_id })

    if (!company) {
      return new Error("Company not fould!")
    }

    const newPost = PostRepository.create({
      company_name: companyName,
      vancancy,
      location,
      salary,
      vacancies,
      information,
      company
    })

    await PostRepository.save(newPost)
  }
}
