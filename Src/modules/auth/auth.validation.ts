import Joi from "joi";

export const schema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().required().case("lower").email(),
  password: Joi.string().required().min(8),
});
