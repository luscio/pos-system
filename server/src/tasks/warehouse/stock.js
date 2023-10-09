import AppDAO from "../../data/AppDAO.js";
import CommodityTask from "../commodity.js";

class StockTask {

    static async getStock(args, type = "date") {
        // 获取所有进货单

        if (!args) {
            return await AppDAO.all(`
        SELECT * FROM stock
        ;`);
        }

        return await AppDAO.get(`
        SELECT * FROM stock WHERE ${type}=?
        ;`, args);
    }

    static async mapStockDetailsIDToText(list) {
        // 将订货单详情从数据库ID转换到前端需要的文字

        return await Promise.all(list.map(async ({ id, commodity_id, in_price, count }) => {
            const { name: commodity_name, barcode } = await CommodityTask.getCommodityDetails(commodity_id, "id");
            return {
                id,
                barcode,
                commodity_name,
                in_price,
                count
            }
        }));
    }

    static async getStockDetails(args) {
        // 获取进货单详细信息

        const result = await AppDAO.all(`
        SELECT * FROM stock_details WHERE stock_id=?
        ;`, args);

        return await this.mapStockDetailsIDToText(result);
    }

    static async checkCommodityList(list) {
        // 检查进货单里的商品是否为有效商品

        const data = [];

        for (let { barcode, count, in_price } of list) {
            const result = await CommodityTask.getCommodityDetails(barcode);
            if (!result) return {
                status: false,
                data: `条码为${barcode}的商品不存在!`
            }
            data.push({
                commodity_id: result.id,
                // start 2023-10-09 add by luscio
                barcode,
                new_count: result.count + count,
                // end 2023-10-09 add by luscio
                count,
                in_price
            });
        }

        return {
            status: true,
            data
        };
    }

    static async createStock(supplier_id, list, description) {
        // 创建一个进货单

        const time = new Date().getTime();
        const fields = ["supplier_id", "date"];
        const args = [supplier_id, time];

        if (description) {
            fields.push("description");
            args.push(description);
        }

        const { lastID: id } = await AppDAO.run(`
        INSERT INTO stock 
        (${fields.join(", ")}) 
        VALUES (?${", ?".repeat(args.length - 1)})
        ;`, args);

        await this.insertStockDetails(id, list);

        await this.updateCommodityCount(list);

        return id;
    }

    static async insertStockDetails(stock_id, list) {
        // 设置进货单的商品

        return await Promise.all(list.map(async ({ commodity_id, count, in_price }) => {
            return await AppDAO.run(`
            INSERT INTO stock_details 
            (stock_id, commodity_id, count, in_price) 
            VALUES (?, ?, ?, ?)
            ;`, [stock_id, commodity_id, count, in_price]);
        }))
    }

    static async updateCommodityCount(list) {
        // 进货后更新库存 2023-10-09 add by luscio
        return await Promise.all(list.map(async ({ barcode, new_count }) => {
            return await AppDAO.run(`UPDATE commodity SET count=? WHERE barcode=?;`, [new_count, barcode]);
        }))
    }
}

export default StockTask;