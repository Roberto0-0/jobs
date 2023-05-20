import { UserRepository } from "../../repositories/UserRepository"
import { PushRepository } from "../../repositories/PushRepository"
import { PostRepository } from "../../repositories/PostRepository"
import { CompanyRepository } from "../../repositories/CompanyRepository"
import { Read } from "../Post/read"

const users: any[] = []

export class PushRead {
    async execute(company_id: string) {
        const push = await PushRepository.find()
        const company = await PushRepository.find({
            where: { company_id: company_id },
            relations: { user: true }
        })
        
        company.map((value) => {
          console.log(value.user.name)
        })

        return company
    }
}
