import passport from "passport"
import jwt from "jsonwebtoken"
import "dotenv/config"

const COMPANY_SECRET_KEY = process.env.COMPANY_SECRET_KEY as string

export class CompanyLogin {
    async execute(req: any, res: any, next: any) {
        passport.authenticate('company_local', { session: false }, async (err: any, company: any, info: any) => {
            try {
                if(err || !company) {
                    req.flash('error', { 
                        message: info.message,
                        data: req.body
                     })
                    res.redirect("/company/login")
                    return
                }

                req.login(company, { session: false }, async (error: any) => {
                    if(error) { return next() }

                    const token = jwt.sign({ id: company.id }, COMPANY_SECRET_KEY, { expiresIn: "1h" })
                    res.cookie('company_payload', token)
                    res.redirect("/company/dashboard")

                    return next()
                })
            } catch (error) { return next() }
        })(req, res, next)
    }
}
