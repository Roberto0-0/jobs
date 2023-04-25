import { z } from "zod";

export const companySchema = z.object({
    user_id: z.string({
        required_error: "User id is required."
    }),
    employer: z.string({
        required_error: "Employer is required."
    }).min(3, "Employer name is too short."),
    companyName: z.string({
        required_error: "companyName is required."
    }).min(3, "Company name is too short."),
    location: z.string({
        required_error: "location is required."
    }).min(5, "Invalid location."),
    email: z.string({
        required_error: "Email is required."
    }).email(),
    aboutCompany: z.string({
        required_error: "This field is required."
    })
})
