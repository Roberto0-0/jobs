import { CompanyRepository } from "../../repositories/CompanyRepository";

export class CompanyReadAll {
  async execute() {
    const company = await CompanyRepository.find()

    if (!company) {
      return new Error("No company.")
    }
    return company
  }
}
