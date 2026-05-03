// const Product = require("../models/Product")

// //יצירת מוצר חדש
// const addProuduct = async (req, res) => {
//     const { name, price, amount, image, category } = req.body
//     if (!name || !price || !image)
//         return res.status(400).json({ message: 'name and price and image is required' })
//     //חסרה בדיקה שהקטגוריה אכן קיימת!!!!!!!!!!!
//     const duplicate = await Product.findOne({ name }).lean()
//     if (duplicate)
//         return res.status(409).json({ message: "Duplicate username" })
//     const product = await Product.create({ name, price, amount, image, category })
//     return res.status(201).json({ message: 'New product created' })
// }

// //קבלת כל המוצרים
// const getAllProducts = async (req, res) => {
//     const products = await Product.find().lean()
//     if (!products?.length) {
//         return res.status(400).json({ message: 'No products found' })
//     }
//     res.json(products)
// }

// // id קבלת פרטי מוצר ספציפי ע"פ  
// const getProductById = async (req, res) => {
//     const { id } = req.params
//     const product = await Product.findById(id).lean()
//     if (!product?.length)
//         return res.status(400).send("No product with this id")
//     res.json(product)
// }
// //קבלת ממצרים ע"פ קטגוריה
// const getProductByCategory = async (req, res) => {
//     const { category } = req.params
//     const product = await Product.find({ category }).lean()
//     if (!product?.length)
//         return res.status(400).send("No product with this category")
//     res.json(product)
// }

// // id מחיקת מוצר ע"פ 
// // const deleteProductById = async (req, res) => {
// //     const { id } = req.params
// //     const product = await Product.findById(id).exec()
// //     if (!product) {
// //         return res.status(400).json({ message: 'Product not found' })
// //     }
// //     const result = await product.deleteOne()
// //     const reply = `Product '${result.name}' ID ${result._id} deleted!`
// //     res.json(reply)
// // }

// // id מחיקת מוצר ע"פ 
// const deleteProduct = async (req, res) => {
//     const { name } = req.body
//     if (!name)
//         return res.status(400).json({ message: 'name is required' })
//     const product = await Product.findOne({ name }).exec()
//     if (!product) {
//         return res.status(400).json({ message: 'Product not found' })
//     }
//     const result = await product.deleteOne()
//     const reply = `Product '${result.name}' is deleted!`
//     res.json(reply)
// }

// // name עדכון מוצר ע"פ 
// const updateProduct = async (req, res) => {
//     const { name, price } = req.body
//     if (!name || !price)
//         return res.status(400).json({ message: 'name and Price are required' })
//     const product = await Product.findOne({ name }).exec()
//     if (!product) {
//         return res.status(400).json({ message: 'Product not found' })
//     }
//     const result = await product.updateOne({ name, price })
//     res.json(`'${result.name}' updated price to ${result.price}`)
// }

// //הפחתה כמות מוצר
// // const updateAmount = async (req, res) => {
// //     const { id } = req.params
// //     const product = await Product.findById(id).exec()
// //     if (!product) {
// //         return res.status(400).json({ message: 'Product not found' })
// //     }
// //     product.amount = amount - 1
// //     const updatedProduct = await product.save()
// //     res.json(`'${updatedProduct.name}'  updated amount to ${updatedProduct.amount}`)
// // }

// module.exports = { addProuduct, getAllProducts, deleteProduct, getProductById, updateProduct, getProductByCategory }//updateAmount




const Product = require("../models/Product")

//addProduct
const addProduct = async (req, res) => {
    const { name, price, amount, image, category, description } = req.body
    if (!name || !price || !image || !category) {
        return res.status(400).send('name and price and image is required!')
    }
    // const duplicate = await Product.findOne({ name }).lean()
    // if (duplicate)
    //     return res.status(409).json({ message: "Duplicate product name" })
    const product = await Product.create({ name, price, amount, image, category, description })
    return res.status(201).json({ message: 'New product created' })
}

//getdAllProducts
// const getdAllProducts = async (req, res) => {
//     const product = await Product.find().lean()
//     if (!product?.length) {
//         return res.status(400).send('There are no products')
//     }
//     res.json(product)
// }

//קבלת כל המוצרים
// const getAllProducts = async (req, res) => {
//     const products = await Product.find().lean()
//     if (!products?.length) {
//         return res.status(400).json({ message: 'No products found' })
//     }
//     res.json(products)
// }


//getdProductsByCategory
const getdProductsByCategory = async (req, res) => {
    const { category } = req.params
    const product = await Product.find({ category }).lean()
    if (!product?.length) {
        return res.status(400).send('there are no products')
    }
    // if(!category)

    res.json(product)
}


// קבלת ממצרים ע"פ קטגוריה באם אין יחזיר הכל
const getProducts = async (req, res) => {
    const { category } = req.query
    if (category) {
        const product = await Product.find({ category }).lean()
        if (!product?.length)
            return res.status(400).send("No product with this category")
        res.json(product)
    }
    else {
        const products = await Product.find().lean()
        if (!products?.length) {
            return res.status(400).json({ message: 'No products found' })
        }
        res.json(products)
    }
}

// id קבלת פרטי מוצר ספציפי ע"פ  
const getdProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).lean();
    if (!product)
        return res.status(400).send("No product with this id");
    res.json(product);
}


// id מחיקת מוצר ע"פ 
const deleteProductById = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) {
        return res.status(404).json({ message: 'Product not found' })
    }
    const productName = product.name;
    const result = await product.deleteOne()
    const reply = `Product '${productName.name}' is deleted!`
    res.json(reply)
}

//updateProduct
const updateProduct = async (req, res) => {
    console.log("??");

    const { id } = req.params

    const { name, price, description, category, amount, image } = req.body
    console.log("??");

    // if (!price || !name) {
    //     return res.status(400).send('there is no product or name')
    // }
    console.log("??");

    const product = await Product.findById(id).exec()
    if (!product) {
        return res.status(400).send('there is no product or name')
    }
    console.log("??");

    await product.updateOne({ name, price, description, category, amount, image })
    res.json("the product is update")

}

module.exports = { addProduct, getdProductById, deleteProductById, updateProduct, getdProductsByCategory, getProducts }//}updateAmount,getAllProducts