import { PostRepository } from "../../repositories/PostRepository";

export class GetPostByCompany {
    async execute(company_id: string) {
        const post = await PostRepository.find({ 
            where: { company_id: company_id },
            relations: { company: true, push: true }
        })

        if(!post) { return new Error("Post not found.") }

        return post
    }
}
