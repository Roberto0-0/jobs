import { AppDataSource } from "../database/data-source";
import { Address } from "../database/entities/address";

export const AddressRepository = AppDataSource.getRepository(Address)