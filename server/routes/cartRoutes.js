const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")

const cartController = require("../controllers/cartController")

router.use(verifyJWT)

router.get("/", cartController.getAllProductsInCart)
router.get("/:id", cartController.getProductsById)
router.post("/", cartController.addProductToCart)
router.delete("/:id", cartController.deleteProductFromCart)
// router.delete("/deleteAll",cartController.deleteAllProductsFromCart)


module.exports = router