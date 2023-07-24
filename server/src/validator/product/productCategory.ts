import Joi from "joi";
import { Page, PageSize } from "@/validator/common";

export const productCategoryListSchema = Joi.object({
    page: Page,
    limit: PageSize
});