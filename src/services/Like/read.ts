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
        
        
        const posts = new Promise((resolve, reject) => {
            company.map((companyValues) => {
                companyValues.post.map( async (postValues) => {
                    const post = await PostRepository.findOne({
                        where: { id: postValues.id },
                        relations: {
                            like: true
                        }
                    })
                    
                    if(post.like) {
                        post.like.map( async (likeValues) => {
                            if(likeValues) {
                                const user = await UserRepository.findOneBy({ id: likeValues.user_id })
                                
                                if(!user) {
                                    return new Error("User not found!")
                                }
                                
                                resolve(user)
                            }
                        })
                    }
                })
            })
        })
        
        
        return posts.then((data) => {
            return data
        })
    }
    
}