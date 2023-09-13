import { UserRepository } from "../../repositories/UserRepository"
import { BcryptService } from "../Bcrypt/index"
import { EmailValidation } from "../EmailValidation"

const bcryptService = new BcryptService()

interface userCreateAttributes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class UserCreate {
  async execute({ ...attributes }: userCreateAttributes) {
    const user = await UserRepository.findOne({ where: { email: attributes.email } })
    
    if(user) { return new Error("Email already registered.") }
    if(!EmailValidation(attributes.email)) { return new Error("Invalid email.") }
    if(attributes.confirmPassword !== attributes.password) { return new Error("Differents password.") }
    
    const passwordHash = await bcryptService.createPasswordHash(attributes.password)
    
    const { confirmPassword: _, ...data } = attributes
    data.password = passwordHash
    const userCreated = UserRepository.create(data)
    
    return await UserRepository.save(userCreated)
  }
}
