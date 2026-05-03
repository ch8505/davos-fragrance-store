

// //routes
// router.post("/", verifyJWT, verifyAdmin, productController.addProuduct)
// router.get("/", productController.getAllProducts)
// router.get("/:id", productController.getProductById)
// router.get("/category/:category", productController.getProductByCategory)
// router.delete("/", verifyJWT, verifyAdmin, productController.deleteProduct)
// router.put("/", verifyJWT, verifyAdmin, productController.updateProduct)
// // router.put("/:id", verifyJWT, productController.updateAmount)



// module.exports = router


const express = require("express")
const router = express.Router()

//middleware
const productController = require("../controllers/prouductController")
const verifyJWT = require('../middleware/verifyJWT')
const verifyAdmin = require("../middleware/verifyAdmin")

//routes
router.post("/", verifyJWT, verifyAdmin, productController.addProduct)
// router.get("/all", productController.getAllProducts)
router.get("/:id", productController.getdProductById)
router.delete("/:id", verifyJWT, verifyAdmin, productController.deleteProductById)
router.put("/:id", verifyJWT, verifyAdmin, productController.updateProduct)
router.get("/category/:category", productController.getdProductsByCategory)
router.get("/", productController.getProducts)


// router.put("/updateAmount/:id",verifyJWT,productController.updateAmount)


module.exports = router
