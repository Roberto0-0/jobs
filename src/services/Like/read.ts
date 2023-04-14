import { UserRepository } from "../../repositories/UserRepository"
import { LikeRepository } from "../../repositories/LikeRepository"
import { PostRepository } from "../../repositories/PostRepository"
import { CompanyRepository } from "../../repositories/CompanyRepository"
import { Read } from "../Post/read"

const users: any[] = []

export class LikeRead {
    async execute(company_id: string) {
        const company = await CompanyRepository.find({
            where: { id: company_id },
            relations: {
                post: true
            }
        })

        return company
    }
    
}