import { PushRepository } from "../../repositories/PushRepository"

export class PushRead {
    async execute(company_id: string) {
        const push = await PushRepository.find({
            where: { company_id: company_id },
            relations: { user: true }
        })

        if(!push) { return new Error("Push not found.") }
        return push
    }
}
