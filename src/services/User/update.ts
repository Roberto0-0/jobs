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
  user_id: string;
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string
}

var newUser: IUser = {}

export class UserUpdate {
  async execute({ id, name, email, password }: Attributes) {
    const user = await UserRepository.findOneBy({ id: id })

    if(!user) { return new Error("User not found.") }
    if(!ComparePasswordHash(password, user.password)) { return new Error("Invalid password.") }

    if(email) {
      const emails = await UserRepository.findOne({ where: { email: email } })

      if(emails) {
        return new Error("Email already exist.")
      }
      newUser = { name, email }

      await UserRepository.update(id, newUser)
    } else {
      newUser = { name, email }

      await UserRepository.update(id, newUser)
    }
  }

  async changePassword({user_id, currentPassword, newPassword, repeatNewPassword }: ChangePassword) {
    const user = await UserRepository.findOneBy({ id: user_id })
    
    if(!user) { return new Error("User not found!") }
    
    const validPassword = await bcrypt.compare(currentPassword, user.password)
    
    if(!validPassword) { return new Error("The password you entered was incorrect.") }
    if(newPassword === currentPassword) { return new Error("Your new password cannot be the same as your old one.") }
    if(repeatNewPassword != newPassword) { return new Error("The passwords are different.") }

    const passwordhash = await CreatePasswordHash(newPassword)
    await UserRepository.update(user_id, { password: passwordhash })
  }
}
