import Joi from "joi";

export const PostSchema = Joi.object({
  company_id: Joi.string().required(),
  companyName: Joi.string().min(3).max(20).required(),
  vancancy: Joi.string().min(3).max(50).required(), 
  location: Joi.string().min(5).max(50).required(),
  salary: Joi.number().required(),
  information: Joi.string().min(5).max(200) 
})
