import { UserRepository } from "../../repositories/UserRepository"
import { LikeRepository } from "../../repositories/LikeRepository"
import { PostRepository } from "../../repositories/PostRepository"
import { CompanyRepository } from "../../repositories/CompanyRepository"

export class LikeRead {
    async execute(company_id: string) {
        const company = await CompanyRepository.find({
            where: { id: company_id }
        })
        
        console.log(company)
        
        /*const like = await LikeRepository.findOne({
            where: { postId: post_id }
        })
        
        if(!like) {
            return new Error("Like not fould!")
        }
        
        const users = await UserRepository.find({
            where: { id: like.userId }
        })*/
        
        return company
    }
}