import { CompanyRepository } from "../../repositories/CompanyRepository";

export class CompanyGetById {
  postPushes: number = 0

  async execute(id: string) {
    const company = await CompanyRepository.findOne({
      where: { id: id },
      relations: {
        complement: true,
        post: true,
        resume: true
      }
    })

    if(!company) { return new Error("Company not found.") }

    for(var push of company.post) { this.postPushes += push.pushes }

    const { password: _, ...payload } = company

    return {
      payload,
      pushes: this.postPushes
    }
  }
}
