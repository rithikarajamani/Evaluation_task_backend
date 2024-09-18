const projectDb = require("../models/product.model");

const productService = {
    async products(limitoffset, filter) {
        const res = await projectDb.findall(filter);
        console.log("res", res);
        const uptoIndex = (Number(limitoffset.limit) + Number(limitoffset.offset));
        const finalResponse = res.slice(limitoffset.offset, uptoIndex);
        return finalResponse;
    },

    async ProductsId(id) {
        const res = await projectDb.findone(id);
        return res;
    }
}

module.exports = productService;