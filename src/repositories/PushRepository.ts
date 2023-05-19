import { AppDataSource } from "../database/data-source";
import { Push } from "../database/entities/push"

export const PushRepository = AppDataSource.getRepository(Push)
