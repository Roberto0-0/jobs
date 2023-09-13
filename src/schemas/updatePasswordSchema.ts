import { z } from "zod"

export const updatePasswordSchema = z.object({
    user_id: z.string({
        required_error: "User id is required."
    }),
    currentPassword: z.string({
        required_error: "Password is required."
    }).min(7, "Password at least 8 characters."),
    newPassword: z.string({
        required_error: "New password is required."
    }).min(7, "Password at least 8 characters."),
    repeatNewPassword: z.string({
        required_error: "Repeat new password is required."
    }).min(7, "Password at least 8 characters.")
}).superRefine(({ newPassword, repeatNewPassword }, ctx) => {
    if(repeatNewPassword != newPassword) {
    ctx.addIssue({
        code:"custom",
        message: "The passwords did not match."
    })
    }
})
