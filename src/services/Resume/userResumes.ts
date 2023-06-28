import { ResumeRepository } from "../../repositories/ResumeRespository";
import { UserRepository } from "../../repositories/UserRepository";

export class UserResume {
    async execute(user_id: string) {
        const user = await UserRepository.findOneBy({ id: user_id })
        const resume = await ResumeRepository.find({
            where: { user_id: user_id },
            relations: { post: true },
            order: { created_at: "DESC" }
        })

        if(!user) { return new Error("User not found.") }
        if(!resume) { return new Error("Resume not found.") }

        return resume
    }
}