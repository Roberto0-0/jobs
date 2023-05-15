import { AppDataSource } from "../database/data-source"
import { Resume } from "../database/entities/resume"

export const ResumeRepository = AppDataSource.getRepository(Resume)
