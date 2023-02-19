import Joi from "joi";

export const CompanySchema = Joi.object({
  id: Joi.string().required(),
  employer: Joi.string().min(3).max(30).required(),
  companyName: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).required()
})
