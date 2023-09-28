import { CompanyRepository } from "../../repositories/CompanyRepository";
import { PostRepository } from "../../repositories/PostRepository";

export interface PostCreateAttributes {
  company_id: string;
  vacancy: string;
  salary: number;
  vacancies: number;
  information?: string;
}

export class PostCreate {
  async execute({ ...data }: PostCreateAttributes) {
    const company = await CompanyRepository.findOne({ 
      where: { id: data.company_id },
      relations: { complement: true }
     })

    if (!company) { return new Error("Company not found.") }

    const postCreated = PostRepository.create({
      company_name: company.company,
      vacancy: data.vacancy,
      location: company.complement.location,
      salary: data.salary,
      vacancies: data.vacancies,
      information: data.information,
      company,
      company_id: company.id
    })
    await PostRepository.save(postCreated)
    return { success_message: `"${postCreated.vacancy}" post was created` }
  }
}
