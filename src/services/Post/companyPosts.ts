import { CompanyRepository } from "../../repositories/CompanyRepository";
import { PostRepository } from "../../repositories/PostRepository";

export class CompanyPost {
    async execute(company_id: string) {
        const company = await CompanyRepository.findOneBy({ id: company_id })
        const post = await PostRepository.find({ 
            where: { company_id: company_id },
            relations: { company: true, push: true }
        })

        if(!company) { return new Error("Company not found.") }
        if(!post) { return new Error("Post not found.") }

        return post
    }
}