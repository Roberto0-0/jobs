import { AppDataSource } from "../database/data-source";
import { Like } from "../database/entities/like"

export const LikeRepository = AppDataSource.getRepository(Like)
