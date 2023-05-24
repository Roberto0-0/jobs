import { ResumeRepository } from "../../repositories/ResumeRespository";
import { UserRepository } from "../../repositories/UserRepository";

interface Attributes {
    user_id: string;
    resume_id: string;
}

export class ResumeDelete {
    async execute({ user_id, resume_id }: Attributes) {
        const user = await UserRepository.findOneBy({ id: user_id })
        const resume = await ResumeRepository.findOneBy({ id: resume_id })

        if(!user) { return new Error("User not found.") }
        if(!resume) { return new Error("Resume not found.") }

        await ResumeRepository.delete(resume_id)
        return { success_message: "Successfully canceled." }
    }
}