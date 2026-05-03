const Cart = require('../models/Cart')
const Product = require('../models/Product')

//הוספת מוצר אל הסל, באם קיים יעדכן את הכמות עפ כמות רצויה או בררת מחדל 1
const addProductToCart = async (req, res) => {
    const { _id, name } = req.user
    const { prodId, amount } = req.body
    if (!prodId) {
        return res.status(400).json({ message: 'prodId is required' })
    }
    let duplicate = await Cart.findOne({ userId: _id, prodId })
    if (!duplicate) {
        duplicate = await Cart.create({ prodId, userId: _id, amount })
        if (duplicate) {
            return res.status(201).json({ message: `${name} added product ${prodId} to cart` })
        }
        else {
            return res.status(400).json({ message: 'Invalid product ' })
        }
    }
    if (!amount)
        duplicate.amount += 1
    else
        duplicate.amount += amount

    const updatedItem = await duplicate.save()
    res.json(`Updated amount for product ${updatedItem.prodId} to ${updatedItem.amount}`)
}

//קבלת כל המוצרים שבסל שלי
const getAllProductsInCart = async (req, res) => {
    const { _id } = req.user
    const products = await Cart.find({ userId: _id }).lean()
    const productsDetails = await Promise.all(products.map(async (product) => {
        const details = await Product.findById(product.prodId).lean();
        return { ...details, amount: product.amount ,prodId: product.prodId}
    }))
    // if (!products?.length) {
    //     return res.status(400).json({ message: `${req.user.name} No products found` })
    // }
    res.json(productsDetails)
}

//קבלת מוצר עפ id
const getProductsById = async (req, res) => {
    const { _id } = req.user
    const { id } = req.params
    const product = await Cart.find({ userId: _id, prodId: id }).lean()
    if (!product?.length)
        return res.status(400).send("No product with this id")
    res.json(product)
}

// מחיקת מוצר מהסל עפ כמות שמכניס באם לא מוחק לגמרי 
const deleteProductFromCart = async (req, res) => {
    const { _id } = req.user
    const { id } = req.params
    console.log("userId:", _id);
    console.log("prodId:", id);
    const product = await Cart.findOne({ userId: _id,prodId: id})
    if (!product)
        return res.status(400).json({ message: 'Product not found' })
    const result = await product.deleteOne()
    const reply = `Product '${result.prodId}'for User ${result.userId} deleted!`
    res.json(reply)
}

// מחיקת כל המוצרים מסל הקניות שלי
// const deleteAllProductsFromCart = async (req, res) => {
//     const { _id } = req.user
//     let products = await Cart.find({ userId: _id })
//     if (!products || products.length === 0)
//         res.status(400).json({ message: "You have no products in your cart." })
//     await Cart.deleteMany({ userId: _id });
//     res.status(200).json({ message: "All products in your cart have been deleted." })
// }



module.exports = {
    addProductToCart,
    getAllProductsInCart,
    getProductsById,
    deleteProductFromCart,
    // deleteAllProductsFromCart
}