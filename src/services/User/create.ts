import { UserRepository } from "../../repositories/UserRepository"
import { BcryptService } from "../Bcrypt/index"

const bcryptService = new BcryptService()

interface userCreateAttributes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class UserCreate {
  async execute({ ...data }: userCreateAttributes) {
    const user = await UserRepository.findOne({ where: { email: data.email } })
    
    if(user) { return new Error("Email already registered.") }
    
    const passwordHash = await bcryptService.createPasswordHash(data.password)
    
    const { confirmPassword: _, ...payload } = data
    payload.password = passwordHash
    const userCreated = UserRepository.create(payload)
    
    return await UserRepository.save(userCreated)
  }
}
