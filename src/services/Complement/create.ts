import { CompanyRepository } from "../../repositories/CompanyRepository";
import { ComplementRepository } from "../../repositories/complementRepository";

interface ComplementCreateAttributres {
    company_id: string;
    sector: string;
    employees: number;
    location: string;
    description: string;
}

export class ComplementCreate {
    async execute({ ...data }: ComplementCreateAttributres) {
        const company = await CompanyRepository.findOne({ where: { id: data.company_id } })
        
        if(!company) { return new Error("Company not found.") }

        const complementCreated = ComplementRepository.create(data)
        await ComplementRepository.save(complementCreated)

        return { message: "Registration completed successfully." }
    }
}
