import { UserRepository } from "../../repositories/UserRepository";

export class UserReadAll {
    async execute(): Promise<typeof users> {
        const users = await UserRepository.find()
        
        if(!users) { return new Error("No users.") }
        return users
    }
}