import { CompanyRepository } from "../../repositories/CompanyRepository";
import { ComplementRepository } from "../../repositories/complementRepository";

interface ComplementReadAttributes {
    complement_id: string;
    company_id: string;
}

export class ComplementRead {
    async execute({ complement_id, company_id }: ComplementReadAttributes) {
        const company = await CompanyRepository.findOneBy({ id: company_id })
        const complement = await ComplementRepository.findOne({
            where: { id: complement_id },
            relations: { company: true }
        })

        if(!company) { return new Error("Company not found.") }
        if(!complement) { return new Error("Complement not found.") }

        return complement
    }
}
