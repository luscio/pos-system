import Joi from "@hapi/joi";
import { categoryNameReq, categoryName } from "./categories.js";
import { name as supplier_name } from "./suppliers.js";

export const barcode = Joi.string().min(1).max(40);
export const name = Joi.string().min(1).max(50);
export const count = Joi.number().min(0).max(1000000);
export const unit = Joi.string().min(1).max(10);
export const size = Joi.string().min(1).max(30);
export const in_price = Joi.number().min(0).max(1000000);
export const sale_price = Joi.number().min(0).max(1000000);
export const vip_points = Joi.boolean();
export const is_delete = Joi.boolean();

export const createCommoditySchema = Joi.object({
    barcode: barcode,
    name: name.required(),
    count: count,
    category_name: categoryNameReq,
    unit,
    size,
    in_price,
    sale_price,
    vip_points,
    is_delete,
    supplier_name: supplier_name,
});

export const updateCommoditySchema = Joi.object({
    current_barcode: barcode.required(),
    update_value: Joi.object({
        barcode: barcode,
        name: name,
        count: count,
        category_name: categoryName,
        unit,
        size,
        in_price,
        sale_price,
        vip_points,
        is_delete,
        supplier_name
    }).or(
        "barcode",
        "name",
        "count",
        "category_name",
        "unit",
        "size",
        "in_price",
        "sale_price",
        "vip_point",
        "is_delete",
        "supplier_name"
    ).required()
});

export const deleteCommoditySchema = Joi.object({
    barcode: barcode.required()
});
