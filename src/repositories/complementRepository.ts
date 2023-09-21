import { AppDataSource } from "../database/data-source";
import { Complement } from "../database/entities/complement";

export const ComplementRepository = AppDataSource.getRepository(Complement)
