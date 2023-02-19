import { UserRepository } from "../../repositories/UserRepository";

export class Delete {
    async execute(id: string) {
        const user = await UserRepository.findOneBy({  id: id })

        if(!user) {
            return new Error("User not fould!")
        }

        await UserRepository.delete(id)
    }
}