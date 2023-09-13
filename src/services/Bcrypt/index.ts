import bcrypt from "bcryptjs"

export class BcryptService {
  async createPasswordHash(password: string) {
    const hash = await bcrypt.hash(password, 10)
    
    return hash
  }
  
  async comparePasswordHash(password: string, userPassword: string) {
    bcrypt.compare(password, userPassword, (err, isMatch) => {
      if(err) { return err }
      if(!isMatch) { return false }
      
      return true
    })
  }
}
