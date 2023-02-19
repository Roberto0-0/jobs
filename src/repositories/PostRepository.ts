import { AppDataSource } from "../database/data-source";
import { Post } from "../database/entities/post";

export const PostRepository = AppDataSource.getRepository(Post)
