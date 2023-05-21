import { ResumeRepository } from "../../repositories/ResumeRespository"
import { UserRepository } from "../../repositories/UserRepository"
import { PostRepository } from "../../repositories/PostRepository"
import { CompanyRepository } from "../../repositories/CompanyRepository"

interface Attributes {
    user_id: string;
    post_id: string;
    company_id: string;
    fullName: string;
    dateOfBirth: Date;
    maritalStatus: string;
    address: string;
    phone: string;
    academicEducation: string;
    information: string;
}

export class ResumeCreate {
    async execute({
        user_id,
        post_id,
        company_id,
        fullName,
        dateOfBirth,
        maritalStatus,
        address,
        phone,
        academicEducation,
        information
    }: Attributes) {
        const user = await UserRepository.findOneBy({ id: user_id })
        const post = await PostRepository.findOneBy({ id: post_id })
        const company = await CompanyRepository.findOneBy({ id: company_id })
        const resume = await ResumeRepository.findOne({ where: { phone: phone } })

        if(!user) { return new Error("User not found.") }
        if(!post) { return new Error("Post not found.") }
        if(!company) { return new Error("Company not found.") }
        if(resume) { return new Error("Phone already exist.") }

        const newResume = ResumeRepository.create({
            fullName,
            dateOfBirth,
            maritalStatus,
            address,
            phone,
            academicEducation,
            information,
            user,
            company,
            post,
            user_id,
            company_id
        })
        await ResumeRepository.save(newResume)

        return { success_message: `Resume has been sent` }
    }
}
