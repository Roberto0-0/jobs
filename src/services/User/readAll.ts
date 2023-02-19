import { UserRepository } from "../../repositories/UserRepository";

export class ReadAll {
    async execute(): Promise<typeof users> {
        const users = await UserRepository.find()

        return users
    }
}