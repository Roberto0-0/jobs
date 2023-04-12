import { z } from "zod";

export const postSchema = z.object({
    company_id: z.string(),
    companyName: z.string({
        required_error: "Company name is required!"
    }),
    vancancy: z.string({
        required_error: "Vancancy is required!"
    }).min(5, "Very short name"),
    location: z.string({
        required_error: "Location is required!"
    }).min(3, "Very short location!"),
    salary: z.number({
        required_error: "salary is required!"
    }).min(1000, "Invalid salary!"),
    vacancies: z.number({
        required_error: "vacancies is required!"
    }).min(1, "Invalid value!"),
    information: z.string()
})

export const updatePostSchema = z.object({
    post_id: z.string(),
    company_id: z.string(),
    company_name: z.string({
        required_error: "Company name is required!"
    }),
    vancancy: z.string({
        required_error: "Vancancy is required!"
    }).min(5, "Very short name"),
    location: z.string({
        required_error: "Location is required!"
    }).min(3, "Very short location!"),
    salary: z.number({
        required_error: "salary is required!"
    }).min(1000, "Invalid salary!"),
    vacancies: z.number({
        required_error: "vacancies is required!"
    }).min(1, "Invalid value!"),
    information: z.string()
})