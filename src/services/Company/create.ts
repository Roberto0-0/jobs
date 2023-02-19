import { CompanyRepository } from "../../repositories/CompanyRepository";
import { UserRepository } from "../../repositories/UserRepository";

interface Attributes {
  id: string;
  employer: string;
  companyName: string;
  email: string;
}

export class Create {
  async execute({ id, employer, companyName, email }: Attributes) {
    const user = await UserRepository.findOneBy({ id: id })

    if(!user) {
      return new Error("User not fould!")
    }
    
    if(user.email != email) {
       return new Error("E-mail not fould")
    }

    const company = await CompanyRepository.findOne({
      where: { company: companyName }
    })

    if (company) {
      return new Error("Company name already exist!")
    }

    const newCompany = CompanyRepository.create({
      employer,
      company: companyName,
      user
    })

    await CompanyRepository.save(newCompany)
  }
}
