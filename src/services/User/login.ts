import passport from "passport"
import jwt from "jsonwebtoken"
import "dotenv/config"

const SECRET_KEY = process.env.SECRET_KEY as string

export class UserLogin {
    async execute(req: any, res: any, next: any) {
        passport.authenticate('user_local', { session: false }, async (err: any, user: any, info: any) => {
            try {
                if(err || !user) {
                    req.flash('error', { 
                        message: info.message,
                        data: req.body
                     })
                    res.redirect("/login")
                    return
                }

                req.login(user, { session: false }, async (error: any) => {
                    if(error) { return next() }

                    const token = jwt.sign({ id: user.id }, SECRET_KEY ,{ expiresIn: "1h" })
                    res.cookie('user_payload', token)
                    res.redirect("/dashboard")
                    return next()
                })
            } catch (error) { return next() }
        })(req, res, next)
    }
}
