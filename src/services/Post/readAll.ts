import { PostRepository } from "../../repositories/PostRepository";

export class PostReadAll {
    execute(option: string) {
        const selectOption = {
            async recent() {
                const post = await PostRepository.find({
                    order: { created_at: "DESC" },
                    relations: { like: true }
                })
    
                if (!post) {
                  return new Error("Post not found.")
                }
                return post
            },
        
            async relevant() {
                const post = await PostRepository.find({
                    order: { likes: "DESC" },
                    relations: { like: true }
                })
    
                if (!post) {
                  return new Error("Post not found.")
                }
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
