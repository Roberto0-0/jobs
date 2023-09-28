import { ResumeRepository } from "../../repositories/ResumeRespository"
import { UserRepository } from "../../repositories/UserRepository"
import { PostRepository } from "../../repositories/PostRepository"
import { CompanyRepository } from "../../repositories/CompanyRepository"

type ResumeCreateProps = {
    user_id: string;
    post_id: string;
    company_id: string;
    information: string;
}

export class ResumeCreate {
    async execute({ ...data }: ResumeCreateProps) {
        const [ user, post, company, resume ] = await Promise.all([
            UserRepository.findOne({ 
                where: { id: data.user_id },
                relations: { address: true }
             }),
            PostRepository.findOneBy({ id: data.post_id }),
            CompanyRepository.findOneBy({ id: data.company_id }),
            ResumeRepository.findOne({ where: { 
                user_id: data.user_id, 
                post_id: data.post_id,
            } })
        ])

        if(!user) { return new Error("User not found.") }
        if(!post) { return new Error("Post not found.") }
        if(!company) { return new Error("Company not found.") }
        if(resume) { return new Error("You already submitted for this vacancy.") }
        if(!user.address) { return new Error("You need to register your address.") }

        const newResume = ResumeRepository.create({
            fullName: user.address.fullName,
            address: user.address.address,
            dateOfBirth: user.address.dateOfBirth,
            phone: user.address.phone,
            maritalStatus: user.address.maritalStatus,
            academicEducation: user.address.academicEducation,
            information: data.information,
            user,
            user_id: data.user_id,
            post,
            post_id: data.post_id,
            company,
            company_id: data.company_id
        })
        await ResumeRepository.save(newResume)

        return { success_message: `Resume has been sent` }
    }
}
