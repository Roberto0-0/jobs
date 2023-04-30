import { UserRepository } from "../../repositories/UserRepository";

export class UserDelete {
    async execute(id: string) {
        const user = await UserRepository.findOneBy({  id: id })

        if(!user) {
            return new Error("User not found.")
        }

        await UserRepository.delete(id)
    }
}