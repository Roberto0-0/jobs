import { UserRepository } from "../../repositories/UserRepository";
import { ComparePasswordHash, CreatePasswordHash } from "../Bcrypt";
import bcrypt from "bcryptjs"

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

interface ChangePassword {
    id: string;
    currentPassword: string;
    newPassword: string;
    repeatNewPassword: string
}

var newUser: IUser = {}

export class UserUpdate {
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

    async changePassword({id, currentPassword, newPassword, repeatNewPassword }: ChangePassword) {
        const user = await UserRepository.findOneBy({ id: id })
        
        if(!user) { return new Error("User not found!") }
        
        bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
            if(err) { return err }
            if(!isMatch) { return new Error("The password you entered was incorrect.") }
        })

        if(newPassword == currentPassword) { return new Error("Your new password cannot be the same as your old one.") }
        if(repeatNewPassword != newPassword) { return new Error("The passwords are different.") }

        const passwordhash = await CreatePasswordHash(newPassword)
        await UserRepository.update(id, { password: passwordhash })
    }
}