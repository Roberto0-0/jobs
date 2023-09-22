import bcrypt from "bcryptjs"

export class BcryptService {
  async createPasswordHash(password: string) {
    const hash = await bcrypt.hash(password, 10)
    
    return hash
  }
  
  async comparePasswordHash(password: string, userPassword: string) {
    if(!bcrypt.compare(password, userPassword)) { return false }
    return true
  }
}
