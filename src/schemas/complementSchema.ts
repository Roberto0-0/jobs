import { z } from "zod"

export const complementCreateSchema = z.object({
    sector:  z.string({
        required_error: "Sector is requied."
    }),
    employees:  z.number({
        required_error: "Employees is requied."
    }).min(1, "Number of employees invalid."),
    location: z.string({
        required_error: "Location is required."
    }).min(5, "Invalid location."),
    description: z.string({
        required_error: "Description is requied."
    })
})
