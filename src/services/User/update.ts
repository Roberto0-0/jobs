import { UserRepository } from "../../repositories/UserRepository";
import { ComparePasswordHash } from "../Bcrypt";

interface Attributes {
    id: string;
    name?: string;
    email?: string;
    password: string;
}

interface IUser {
    name?: string;
    email?: string;
}

var newUser: IUser = {}

export class Update {
    async execute({ id, name, email, password }: Attributes) {
       const user = await UserRepository.findOneBy({ id: id })

        if(!user) {
            return new Error("User not fould!")
        }
        if(!ComparePasswordHash(password, user.password)) {
            return new Error("Invalid password")
        }

        if(email) {
            const emails = await UserRepository.findOne({
                where: { email: email }
            })
    
            if(emails) {
                return new Error("Email already exist!")
            }
            newUser = {
                name,
                email
            }
    
            await UserRepository.update(
                id,
                newUser
            )
        } else {
            newUser = {
                name,
                email
            }
    
            await UserRepository.update(
                id,
                newUser
            )
        }
    }
}