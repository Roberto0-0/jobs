import { UserRepository } from "../../repositories/UserRepository"
import { ResumeRepository } from "../../repositories/ResumeRespository"

const resumeList: any[] = []

export class ResumeRead {
    async execute(user_id: string) {
        const user = await UserRepository.findOne({ 
            where: { id: user_id },
            relations: {
                resume: true,
            }
        })

        if(!user) { return new Error("User not found.") }

        const userResumes = user.resume

        const resumePosts = new Promise((resolve, reject) => {
            userResumes.map(async (value) => {
                const resume = await ResumeRepository.findOne({ 
                    where: { id: value.id },
                    relations: { 
                        post: true
                    }
                })

                if(!resume) { return new Error("Resume not found.") }

                const newResume = resumeList.find((r => r.id === resume.id ))

                if(!newResume) {
                    resumeList.push(resume)
                }

                return resolve(resumeList)
            })
        })

        const resultResumePosts = await resumePosts

        return resultResumePosts
    }
}
