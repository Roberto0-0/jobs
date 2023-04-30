import { CompanyRepository } from "../../repositories/CompanyRepository";

export class CompanyDelete {
  async execute(id: string) {
    const company = await CompanyRepository.findOneBy({ id: id })

    if (!company) {
      return new Error("Company not found.")
    }

    await CompanyRepository.delete(id)
  }
}
