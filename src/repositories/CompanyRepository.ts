import { AppDataSource } from "../database/data-source";
import { Company } from "../database/entities/company";

export const CompanyRepository = AppDataSource.getRepository(Company)
