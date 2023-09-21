import { Request } from "express"

export const cookieUserExtractor = (req: Request) => {
    var token = null
    if (req && req.cookies) { token = req.cookies['user_payload'] }
    
    return token
}
