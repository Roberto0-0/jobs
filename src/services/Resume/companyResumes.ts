import { ResumeRepository } from "../../repositories/ResumeRespository";
import { CompanyRepository } from "../../repositories/CompanyRepository";

export class CompanyResume {
    async execute(company_id: string) {
        const company = await CompanyRepository.findOneBy({ id: company_id })
        const resume = await ResumeRepository.find({ 
            where: { company_id: company_id },
            relations: { user: true, post: true }
        })

        if(!company) { return new Error("Company not found.") }
        if(!resume) { return new Error("Resume not found.") }

        return resume
    }
}