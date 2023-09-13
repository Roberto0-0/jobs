import { UserRepository } from "../../repositories/UserRepository"
import { BcryptService } from "../Bcrypt/index"

const bcryptService = new BcryptService()

interface userUpdateAttributes {
  id: string;
  name?: string;
  email?: string;
  password: string;
}

export class UserUpdate {
  async execute({ ...attributes }: userUpdateAttributes) {
    const user = await UserRepository.findOneBy({ id: attributes.id })

    if(!user) { return new Error("User not found.") }
    if(!bcryptService.comparePasswordHash(attributes.password, user.password)) { return new Error("Passwords don't match.") }

    return await UserRepository.update(attributes.id, attributes)
  }
}
