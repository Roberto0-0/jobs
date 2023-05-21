import passport from "passport";
import { Strategy } from "passport-local"
import { UserRepository } from "../../repositories/UserRepository";
import bcrypt from "bcryptjs"

export default function(value: any): void {
  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user: any, done) => {
    UserRepository.findOne({
        where: { id: user.id },
        relations: { company: true }
    }).then((user) => {
        return done(null, user)
    }).catch((err) => {
      console.error(err)
      return done(null, err)
    })
  })

  passport.use(
    new Strategy({ 
      usernameField: "email", 
      passwordField: "password" 
    }, (email, password, done) => {
      UserRepository.findOne({ where: { email: email } }).then((user) => {
        if (!user) { return done(null, false, { message: "Check your email or password." }) }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if(err) { return done(null, err) }
          if(!isMatch) { return done(null, false, { message: "Check your email or password." }) }
          return done(null, user);
        })
      }).catch((err) => {
        return done(err)
      })
  }))
} 