import { UserRepository } from "../../repositories/UserRepository"
import { CreatePasswordHash} from "../Bcrypt/index"
import { EmailValidation } from "../EmailValidation"; 

interface Attributes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class Create {
  async execute({ name, email, password, confirmPassword }: Attributes) {
    const user = await UserRepository.findOne({
      where: { email: email }
    })
    
    if(user) {
      return new Error("User already exist!")
    }

    if(!EmailValidation(email)) {
      return new Error("E-mail invalid!")
    }
    
    if(password !== confirmPassword) {
      return new Error("Differents password!")
    }
    
    const newPassword = await CreatePasswordHash(password)
    
    const newUser = UserRepository.create({
      name,
      email,
      password: newPassword
    })
    
    await UserRepository.save(newUser)
  }
}
