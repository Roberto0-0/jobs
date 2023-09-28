import { AddressRepository } from "../../repositories/AddressRepository";
import { UserRepository } from "../../repositories/UserRepository";

type AddressProps = {
    user_id: string;
    fullName: string;
    dateOfBirth: Date;
    maritalStatus: string;
    address: string;
    phone: string;
    academicEducation: string;
}

export class AddressCreate {
    async execute({ ...data }: AddressProps): Promise<void | Error> {
        const user = await UserRepository.findOneBy({ id: data.user_id })
        const address = await AddressRepository.findOneBy({ user_id: data.user_id })
        
        if(!user) { return new Error("User not found.") }
        if(address) { return new Error("You already have a registered address.") }

        const addressCreated = AddressRepository.create(data)
        await AddressRepository.save(addressCreated)
    }
}