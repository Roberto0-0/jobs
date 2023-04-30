import { UserRepository } from "../../repositories/UserRepository";
import { CompanyRepository } from "../../repositories/CompanyRepository";

interface Attributes {
   user_id: string;
   company_id: string;
}

export class CompanyRead {
  async execute({ user_id, company_id }: Attributes) {
     const user = await UserRepository.findOneBy({ id: user_id })
     const company = await CompanyRepository.findOne({
        where: { id: company_id },
        relations: {
           post: true
        }
     })
     
     if(!user) {
        return new Error("User not found.")
     }
     
     if(!company) {
        return new Error("Company not found.")
     }

    return company
  }
}
