import { UserRepository } from "../../repositories/UserRepository"
import { BcryptService } from "../Bcrypt/index"
import bcrypt from "bcryptjs"

const bcryptService = new BcryptService()

interface UserUpdatePasswordAttributes {
    user_id: string;
    currentPassword: string;
    newPassword: string;
    repeatNewPassword: string;
}

export class UserUpdatePassword {
    async execute({ ...attributes }: UserUpdatePasswordAttributes) {
        const user = await UserRepository.findOneBy({ id: attributes.user_id })
    
        if(!user) { return new Error("User not found.") }

        const comparePasswordResult = await bcrypt.compare(user.password, attributes.currentPassword)
        if(!comparePasswordResult) { return new Error("The password you entered was incorrect.") }
        if(attributes.newPassword === attributes.currentPassword) { return new Error("Your new password cannot be the same as your old one.") }
        if(attributes.repeatNewPassword !== attributes.newPassword) { return new Error("The passwords are different.") }
    
        const passwordhash = await bcryptService.createPasswordHash(attributes.newPassword)

        return await UserRepository.update(attributes.user_id, { password: passwordhash })
    }
}
