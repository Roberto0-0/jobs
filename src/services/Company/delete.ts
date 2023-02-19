import { CompanyRepository } from "../../repositories/CompanyRepository";

export class Delete {
  async execute(id: string) {
    const company = await CompanyRepository.findOneBy({ id: id })

    if (!company) {
      return new Error("Company not fould!")
    }

    await CompanyRepository.delete(id)
  }
}
