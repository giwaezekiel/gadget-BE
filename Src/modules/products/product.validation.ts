import { IProducts } from "./product.types";

export const productValidator = (data: IProducts) => {
  const {
    productName,
    productDesc,
    productBrand,
    productPrice,
    productRating,
    productReviews,
    productWarranty,
  } = data;
  if (
    !productName ||
    !productDesc ||
    !productBrand ||
    !productPrice ||
    !productRating ||
    !productReviews ||
    !productWarranty
  ) {
    throw new Error("input all fields");
  }

  if (Number(productPrice) < 0.0) {
    throw new Error("Price must be Greater than 0");
  }
};
