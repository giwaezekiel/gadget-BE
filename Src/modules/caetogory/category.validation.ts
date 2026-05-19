import Joi from "joi";

export const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  desc: Joi.string().min(3),
  parentCategory: Joi.string().hex().length(24),
});
