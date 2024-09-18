const serviceProduct = require("../service/product.service");

const getallProduct = {
    async getproduct(req, res) {
        try {
            const limitoffset= req.query;
            if(limitoffset.limit == undefined || limitoffset.offset == undefined ){
                res.status(400).send("Bad Request");
                return
            }
            const filter = req.body;
            console.log("filter",filter);
            await serviceProduct.products(limitoffset, filter).then((data) => {
                if(data) {
                    res.status(200).send(data);
                } else{
                    res.status(400).send("Unexpected error");
                }
            });
        } catch (error) {
            res.status(400).send("Unexpected Error Occured");
        }
    },

    async productsById(req, res) {
        try {
            const { id } = req.query;
            await serviceProduct.ProductsId(id).then((data) => {
                if(data) {
                    res.status(200).send(data);
                } else{
                    res.status(400).send("Unexpected error");
                }
            })
        } catch (error) {
            res.status(400).send("Unexpected Error Occured");
        }
    }
}

module.exports = getallProduct;