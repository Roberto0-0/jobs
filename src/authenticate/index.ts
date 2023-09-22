import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as JwtStrategy } from "passport-jwt"
import bcrypt from "bcryptjs"
import { UserRead } from "../services/User/read"
import { cookieUserExtractor } from "../services/Cookie/user"
import { cookieCompanyExtractor } from "../services/Cookie/company"
import { UserRepository } from "../repositories/UserRepository";
import { CompanyRepository } from "../repositories/CompanyRepository"
import { CompanyGetById } from "../services/Company/read"
import "dotenv/config"

const SECRET_KEY = process.env.SECRET_KEY as string
const COMPANY_SECRET_KEY = process.env.COMPANY_SECRET_KEY as string

passport.use('user_local',
  new LocalStrategy({ 
    usernameField: "email", 
    passwordField: "password",
  }, async (email, password, done) => {
    try {
      const user = await UserRepository.findOne({ where: { email: email } })

      if(!user) { return done(null, false, { message: "Check your email or password." }) }

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) { return done(null, err) }
        if(!isMatch) { return done(null, false, { message: "Check your email or password." }) }

        return done(null, user)
      })
    } catch (error) { return done(error) }
}))

passport.use('company_local',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
}, async (email, password, done) => {
    try {
        const company = await CompanyRepository.findOne({ where: { email: email } })

        if(!company) { return done(null, false, { message: "Check your email or password." }) }

        bcrypt.compare(password, company.password, (err, isMatch) => {
            if(err) { return done(null, err) }
            if(!isMatch) { return done(null, false, { message: "Check your email or password." }) }

            return done(null, company)
        })
    } catch (error) { return done(error) }
}))

passport.use('user_jwt',
  new JwtStrategy({
    secretOrKey: SECRET_KEY,
    jwtFromRequest: cookieUserExtractor,
  }, async (token, done) => {
    try {
      const userGetByIdService = new UserRead()
      const userGetByIdResult = await userGetByIdService.execute(token.id)

      if(userGetByIdResult instanceof Error) { return done(null, false, { message: userGetByIdResult.message }) }

      const { password: _, ...data } = userGetByIdResult
      
      return done(null, data)
    } catch (error) { return done(error) }
  })
)

passport.use('company_jwt',
    new JwtStrategy({
    secretOrKey: COMPANY_SECRET_KEY,
    jwtFromRequest: cookieCompanyExtractor
}, async (token, done) => {
    try {
        const companyGetByIdService = new CompanyGetById()
        const companyGetByIdResult = await companyGetByIdService.execute(token.id)

        if(companyGetByIdResult instanceof Error) { return done(null, false, { message: companyGetByIdResult.message }) }

        return done(null, companyGetByIdResult)
    } catch (error) { return done(error) }
}))
