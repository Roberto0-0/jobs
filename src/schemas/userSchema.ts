import { z } from "zod";

export const userRegisterSchema = z.object({
  name: z.string({
    required_error: "Name is required."
  }).min(3, "Very short name."),
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
