import { UserRepository } from "../../repositories/UserRepository";
import { PostRepository } from "../../repositories/PostRepository";
import { ResumeRepository } from "../../repositories/ResumeRespository";

interface Attributes {
    resume_id: string;
    user_id: string;
    post_id: string;
    option: string;
}

export interface IStringIndex {
    [key: string]: any
}

export class ResumeStatus {
    async execute({ resume_id, user_id, post_id, option }: Attributes) {
        const resume = await ResumeRepository.findOne({ where: { id: resume_id } })
        const user = await UserRepository.findOne({ where: { id: user_id } })
        const post = await PostRepository.findOne({ where: { id: post_id } })

        if(!resume) { return new Error("Resume not found.") }
        if(!user) { return new Error("User not found.") }
        if(!post) { return new Error("User not found.") }

        const resumeStatus: IStringIndex = {
            async accepted() {
                resume.status = "selected"
                resume.alteration = true

                if(post.vacancies === 0) { return new Error("There are no more vacancies.") }
                post.vacancies = post.vacancies - 1

                await ResumeRepository.save(resume)
                await PostRepository.save(post)
                return {
                    successMessage: `"${user.name}" resume was accepted`,
                    company_id: post.company_id
                }
            },

            async refused() {
                resume.status = "notSelected"
                resume.alteration = true

                await ResumeRepository.save(resume)
                return {
                    successMessage: `"${user.name}" resume was rejected`,
                    company_id: post.company_id
                }
            }
        }

        const resumeStatusResult = resumeStatus[option]

        if(resumeStatusResult) { return resumeStatusResult() }
        return new Error("error when changing resume value")
    }   
}