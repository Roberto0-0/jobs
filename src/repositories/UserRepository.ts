import { AppDataSource } from "../database/data-source"
import { User } from "../database/entities/user"

export const UserRepository = AppDataSource.getRepository(User)