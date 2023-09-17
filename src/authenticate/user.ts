import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local"
import { Strategy as JwtStrategy } from "passport-jwt"
import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcryptjs"
import { UserRead } from "../services/User/read"
import { cookieExtractor } from "../services/Cookie/index"
import "dotenv/config"

const SECRET_KEY = process.env.SECRET_KEY as string

passport.use(
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

passport.use(
  new JwtStrategy({
    secretOrKey: SECRET_KEY,
    jwtFromRequest: cookieExtractor,
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
