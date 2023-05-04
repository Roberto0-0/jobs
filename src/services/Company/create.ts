import { CompanyRepository } from "../../repositories/CompanyRepository";
import { UserRepository } from "../../repositories/UserRepository";

interface Attributes {
  user_id: string;
  employer: string;
  companyName: string;
  location: string;
  email: string;
  aboutCompany: string;
}

export class CompanyCreate {
  async execute({ user_id, employer, companyName, location, email, aboutCompany }: Attributes) {
    const user = await UserRepository.findOneBy({ id: user_id })
    const company = await CompanyRepository.findOne({
      where: { company: companyName }
    })

    if(!user) { return new Error("User not found.") }
    
    if(user.email != email) { return new Error("Invalid email.") }
    
    if (company) { return new Error("Company name has already been registered.") }

    const newCompany = CompanyRepository.create({
      employer,
      company: companyName,
      location,
      aboutCompany,
      user
    })
    await CompanyRepository.save(newCompany)
    return { success_message: `"${newCompany.company}" company was registered` }
  }
}
