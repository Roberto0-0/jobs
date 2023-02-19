import { UserRepository } from "../../repositories/UserRepository";

export class UserRead {
  async execute(id: string): Promise<typeof user | Error> {
    const user = await UserRepository.findOne({
      where: { id: id },
      relations: {
        company: true,
        like: true
      }
    })

    if (!user) {
      return new Error("User not fould!")
    }

    return user
  }

}
