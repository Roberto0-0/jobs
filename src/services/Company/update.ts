import { CompanyRepository } from "../../repositories/CompanyRepository";

interface Attributes {
  company_id: string,
  company_name: string,
  employer: string,
  email: string;
}

interface ICompany {
  company?: string,
  employer?: string,
  email?: string;
}

let companies: ICompany = {}

export class Update {
  async execute({ company_id, company_name, employer, email }: Attributes) {
    const company = await CompanyRepository.findOneBy({ id: company_id })

    if (!company) {
      return new Error("Company not fould!")
    }

    if (company_name) {
      const company_name_check = await CompanyRepository.findOne({
        where: { company: company_name }
      })

      if (company_name_check) {
        return new Error("Company name already exist!")
      }

      if (email) {
        const company_email_check = await CompanyRepository.findOne({
          where: { email: email }
        })

        if (company_email_check) {
          return new Error("Email already exist!")
        }

        companies = {
          company: company_name,
          employer,
          email
        }

        await CompanyRepository.update(
          company.id,
          companies
        )
      }
    }

    companies = {
      company: company_name,
      employer,
      email
    }

    await CompanyRepository.update(
      company.id,
      companies
    )
  }
}
