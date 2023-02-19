import { CompanyRepository } from "../../repositories/CompanyRepository";

export class ReadAll {
  async execute() {
    const company = await CompanyRepository.find()

    if (!company) {
      return new Error("No company!")
    }

    return company
  }
}
