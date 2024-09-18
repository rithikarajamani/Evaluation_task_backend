const mongoose = require('mongoose');

const Products = new mongoose.Schema({
    productName: {
        type : String,
        require : true,
    },
    description: {
        type : String,
        require : true,
    },
    price: {
        type : String,
        require : true,
    },
    brand: {
        type : String,
        require : true,
    },
    size: {
        type : String,
        require : true,
    },
    color: {
        type : String,
        require : true,
    },
    type: {
        type : String,
        require : true,
    },
    rating: {
        type : String,
        require : true,
    },
    ratingCount: {
        type : String,
        require : true,
    },
    Status:{
        type:String,
        require:true,
        default: 'Active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type : String,
        require : true,
    },
    productId: {
        type : String,
        require : true,
    },
})

const productlist = mongoose.model('product_list1',Products,'product_list1');

async function findall(filters) {
    const query = {Status: "Active"};

    if(filters.price && filters.price.minPrice && filters.price.maxPrice) {
        query.price = { $gte: filters.price.minPrice, $lte: filters.price.maxPrice };
    }

    if (filters.brand.length > 0) {
        query.brand = { $in: filters.brand };
    }

    if (filters.Size) {
        query.size = { $in: filters.Size };
    }

    if (filters.type) {
        query.type = { $in: filters.type };
    }

    if (filters.color.length > 0) {
        query.color = { $in: filters.color };
    }

    if (filters.search) {
        query.$or = [
          { productName: { $regex: filters.search, $options: 'i' } },
        ];
    }

    try {
        const products = await productlist.find(query);
        return products;
    } catch(err) {
        console.log("🚀 ~ findall ~ err:", err)
    }
}

async function findone(pid) {
    try {
        const response = await productlist.findOne(
            {productId: pid},
        );
        return response;
    } catch(err) {
        console.log("🚀 ~ findall ~ err:", err)
    }
}

module.exports = {productlist,findall, findone};