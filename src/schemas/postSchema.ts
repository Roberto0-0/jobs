import { z } from "zod";

export const postSchema = z.object({
    company_id: z.string(),
    companyName: z.string({
        required_error: "Company name is required."
    }),
    vacancy: z.string({
        required_error: "Vacancy is required."
    }).min(5, "Very short vancancy."),
    location: z.string({
        required_error: "Location is required."
    }).min(5, "Invalid location."),
    salary: z.number({
        required_error: "Salary is required."
    }).min(1000, "Invalid salary."),
    vacancies: z.number({
        required_error: "Vacancies is required."
    }).min(1, "Invalid Vacancies."),
    information: z.string()
})

export const updatePostSchema = z.object({
    post_id: z.string(),
    company_id: z.string(),
    company_name: z.string({
        required_error: "Company name is required."
    }),
    vacancy: z.string({
        required_error: "Vacancy is required."
    }).min(5, "Very short vancancy."),
    location: z.string({
        required_error: "Location is required."
    }).min(5, "Ivalid location."),
    salary: z.number({
        required_error: "Salary is required."
    }).min(500, "Invalid salary."),
    vacancies: z.number({
        required_error: "Vacancies is required."
    }).min(1, "Invalid vacancies."),
    information: z.string()
})