import { z } from "zod";

const postCreateSchema = z.object({
    company_id: z.string(),
    vacancy: z.string({
        required_error: "Vacancy is required."
    }).min(5, "Very short vacancy."),
    salary: z.number({
        required_error: "Salary is required."
    }).min(1000, "Invalid salary."),
    vacancies: z.number({
        required_error: "Vacancies is required."
    }).min(1, "Invalid Vacancies."),
    information: z.string()
})

const postUpdateSchema = z.object({
    post_id: z.string(),
    company_id: z.string(),
    vacancy: z.string({
        required_error: "Vacancy is required."
    }).min(5, "Very short vacancy."),
    salary: z.number({
        required_error: "Salary is required."
    }).min(500, "Invalid salary."),
    vacancies: z.number({
        required_error: "Vacancies is required."
    }).min(1, "Invalid vacancies."),
    information: z.string()
})

export { postCreateSchema, postUpdateSchema }
