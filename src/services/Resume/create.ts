import { ResumeRepository } from "../../repositories/ResumeRespository"
import { UserRepository } from "../../repositories/UserRepository"
import { PostRepository } from "../../repositories/PostRepository"
import { CompanyRepository } from "../../repositories/CompanyRepository"

interface Attributes {
    user_id: string;
    post_id: string;
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
        const company = await CompanyRepository.findOne({ where: { company: post?.company_name } })

        if(!user) { return new Error("User not found.") }
        if(!post) { return new Error("Post not found.") }
        if(!company) { return new Error("Company not found.") }

        const newResume = ResumeRepository.create({
            fullName,
            dateOfBirth,
            maritalStatus,
            address,
            phone,
            academicEducation,
            information,
            user,
            company
        })

        await ResumeRepository.save(newResume)

        return newResume
    }
}
