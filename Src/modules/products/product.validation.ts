import Joi from "joi";

export const schema = Joi.object({
  productName: Joi.string().required().min(1),
  productDesc: Joi.string().required(),
  productBrand: Joi.string().required(),
  productRating: Joi.number().required().min(0).integer(),
  productReviews: Joi.string().required(),
  productPrice: Joi.number().required(),
  productImages: Joi.array().items(Joi.string().uri()),
  productWarranty: Joi.number().required(),
});
