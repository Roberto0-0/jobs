import { UserRepository } from "../../repositories/UserRepository";
import { CompanyRepository } from "../../repositories/CompanyRepository";

interface Attributes {
   user_id: string;
   company_id: string;
}

export class Read {
  async execute({ user_id, company_id }: Attributes) {
     const user = await UserRepository.findOneBy({ id: user_id })
     
     if(!user) {
        return new Error("User not fould!")
     }
     
     const company = await CompanyRepository.findOne({
        where: { id: company_id },
        relations: {
           post: true
        }
     })
     
     if(!company) {
        return new Error("Company not fould!")
     }

    return company
  }
}
