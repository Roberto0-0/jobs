import { User } from "../../database/entities/user";
import { UserRepository } from "../../repositories/UserRepository";

export class UserRead {
  async execute(id: string): Promise<User | Error> {
    const user = await UserRepository.findOne({
      where: { id: id },
      relations: { address: true, push: true }
    })

    if (!user) { return new Error("User not found.") }
    
    return user
  }

}
