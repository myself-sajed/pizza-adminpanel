import { ProductData } from "../../types/login.types";

export const convertToFormData = (productData: ProductData) => {
  const formData = new FormData();

  Object.entries(productData).forEach(([key, value]) => {
    if (key === "image") {
      formData.append(key, value.file);
    } else if (key === "priceConfiguration" || key === "attributes") {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};
