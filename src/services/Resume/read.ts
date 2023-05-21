import { ResumeRepository } from "../../repositories/ResumeRespository"

export class ResumeRead {
    async execute(resume_id: string) {
        const resume = await ResumeRepository.findOne({ 
            where: { id: resume_id },
            relations: { user: true, post: true }
        })

        if(!resume) { return new Error("Resume not found.") }

        return resume
    }
}
