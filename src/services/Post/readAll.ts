import { PostRepository } from "../../repositories/PostRepository";
import { IStringIndex } from "../Resume/resumeResult";

export class PostReadAll {
    execute(option: string) {
        const selectOption: IStringIndex = {
            async recent() {
                const post = await PostRepository.find({
                    order: { created_at: "DESC" },
                    relations: { company: true, push: true }
                })
    
                if (!post) { return new Error("Post not found.") }
                return post
            },
        
            async relevant() {
                const post = await PostRepository.find({
                    order: { pushes: "DESC" },
                    relations: { company: true, push: true }
                })
    
                if (!post) { return new Error("Post not found.") }
                return post
            }
        }
        
        const executable = selectOption[option || "relevant"]
        if(executable) {
            return executable()
        }
        return selectOption.relevant()
    }
}
