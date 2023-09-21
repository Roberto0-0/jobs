import { CompanyRepository } from "../../repositories/CompanyRepository";
import { BcryptService } from "../Bcrypt/index"

const bcryptService = new BcryptService()

interface CompanyCreateAttributes {
  name: string;
  surname: string;
  CNPJ: string;
  company: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class CompanyCreate {
  async execute({ ...data }: CompanyCreateAttributes) {
    const company = await CompanyRepository.findOne({ where: { email : data.email } })

    if(company) { return new Error("Email already registered.") }

    const passwordHash = await bcryptService.createPasswordHash(data.password)

    const { confirmPassword: _, ...payload } = data
    payload.password = passwordHash

    const companyCreated = CompanyRepository.create(payload)
    await CompanyRepository.save(companyCreated)

    return
  }
}
