import bcrypt from "bcryptjs"

const CreatePasswordHash = async (password: string) => {
  const hash = bcrypt.hash(password, 10)
  
  return hash
}

const ComparePasswordHash = async (password: string, userPassword: string) => {
  bcrypt.compare(password, userPassword, (err, isMatch) => {
    if(err) { return err }
    if(isMatch) { return true }
  })
}

export { CreatePasswordHash, ComparePasswordHash }