import { z } from "zod";

export const companyRegisterSchema = z.object({
    name:  z.string({
        required_error: "Name is requied.",
    }).min(5, "Very short name."),
    surname:  z.string({
        required_error: "Surname is requied.",
    }).min(5, "Very short surname."),
    CNPJ: z.string({
        required_error: "CNPJ is requied.",
    }).min(14, "The CNPJ field requires 14 digits."),
    company: z.string({
        required_error: "Company name is required."
    }).min(3, "Company name is too short."),
    email: z.string({
        required_error: "Email is required."
    }).email(),
    password: z.string({
        required_error: "Password is required"
      }).min(7, "Password at least 8 characters."),
      confirmPassword: z.string({
        required_error: "Confirm password is required."
      })
    }).superRefine(({ confirmPassword, password }, ctx) => {
      if(confirmPassword != password) {
        ctx.addIssue({
          code:"custom",
          message: "The passwords did not match."
        })
    }
})
