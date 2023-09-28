import { UserRepository } from "../../repositories/UserRepository"
import bcrypt from "bcryptjs"
import { BcryptService } from "../Bcrypt";

interface UserUpdatePasswordAttributes {
    user_id: string;
    currentPassword: string;
    newPassword: string;
    repeatNewPassword: string;
}

export class UserUpdatePassword extends BcryptService {
    constructor() { super(), this.createPasswordHash }

    public async execute({ ...data }: UserUpdatePasswordAttributes): Promise<void | Error> {
        const user = await UserRepository.findOneBy({ id: data.user_id })
    
        if(!user) { return new Error("User not found.") }

        if(!bcrypt.compare(user.password, data.currentPassword)) { return new Error("The password you entered was incorrect.") }
        if(data.newPassword === data.currentPassword) { return new Error("Your new password cannot be the same as your old one.") }
        if(data.repeatNewPassword !== data.newPassword) { return new Error("The passwords are different.") }
    
        const passwordhash = await this.createPasswordHash(data.newPassword)

        await UserRepository.update(data.user_id, { password: passwordhash })
        return
    }
}
