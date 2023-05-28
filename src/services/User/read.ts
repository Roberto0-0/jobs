import { UserRepository } from "../../repositories/UserRepository";

export class UserRead {
  async execute(id: string): Promise<typeof user | Error> {
    const user = await UserRepository.findOne({
      where: { id: id },
      relations: {
        company: true,
        push: true
      }
    })

    if (!user) { return new Error("User not found.") }
    return user
  }

}
