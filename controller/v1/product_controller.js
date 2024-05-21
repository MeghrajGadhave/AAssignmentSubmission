const ProductDB = require('../../models/product');
const fs = require('fs');
const path = require('path');

// view products
module.exports.viewProduct = async function (req, res) {
    try {
        let products;

        //if user send product id or not
        if (req.query.id) {
            //specific product
            products = await ProductDB.find({ _id: req.query.id });
        }
        else {
            //all products
            products = await ProductDB.find({});
        }

        return res.status(200).json({
            message: "All products",
            products
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

//delete product 
module.exports.deleteProduct = async function (req, res) {
    try {
        let { id } = req.query;

        //check admin send product id or not
        if (!id) {
            return res.status(300).json({
                message: "product id not found"
            })
        }

        //find product in DB
        let product = await ProductDB.findById(id);

        //if product not found in DB
        if (!product) {
            return res.status(300).json({
                message: "product id not found"
            })
        }

        //first delete img of product 
        if (product.img) {
            //check given location file exist or not
            if (fs.existsSync(path.join(__dirname, '../../', product.img))) {
                //delete file
                fs.unlinkSync(path.join(__dirname, '../../', product.img));
            }
        }

        //delete product 
        await product.deleteOne();

        return res.status(200).json({
            message: "product delete successfully",
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}