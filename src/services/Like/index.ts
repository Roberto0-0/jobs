import { LikeRepository } from "../../repositories/LikeRepository"
import { PostRepository } from "../../repositories/PostRepository"
import { UserRepository } from "../../repositories/UserRepository"

interface Attributes {
  user_id: string;
  post_id: string;
}

export class Like {
  async execute({ user_id, post_id }: Attributes) {
    const user = await UserRepository.findOneBy({ id: user_id })

    if (!user) {
      return new Error("User not fould!")
    } else {
      const post = await PostRepository.findOneBy({ id: post_id })

      if (!post) {
        return new Error("Post not fould!")
      } else {
        const like = await LikeRepository.findOne({
          where: {
            user_id: user_id,
            post_id: post_id
          }
        })
        var newLikes = post.likes
        if (!like) {
          const liked = LikeRepository.create({
            liked: true,
            user_id,
            post_id,
            user,
            post
          })
          await LikeRepository.save(liked)

          await PostRepository.update(
            post_id,
            {
              likes: newLikes += 1
            }
          )
        } else {
          if (like.liked) {
            await LikeRepository.update(
              like.id,
              {
                liked: false
              }
            )
            if (newLikes > 0) {
              await PostRepository.update(
                post_id,
                {
                  likes: newLikes -= 1
                }
              )
            } else if (newLikes <= 0) {
              await PostRepository.update(
                post_id,
                {
                  likes: 0
                }
              )
            }
          } else {
            await LikeRepository.update(
              like.id,
              {
                liked: true
              }
            )
            await PostRepository.update(
              post_id,
              {
                likes: newLikes += 1
              }
            )
          }
        }
      }
    }
  }
}
