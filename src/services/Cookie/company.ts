import { Request } from "express"

export const cookieCompanyExtractor = (req: Request) => {
    var token = null
    if (req && req.cookies) { token = req.cookies['company_payload'] }
    
    return token
}
