const express =
    require("express");

const router =
    express.Router();

const {

    getProducts,
    getSingleProduct,
    createProduct,
    deleteProduct

} = require(
    "../controllers/productController"
);

const authMiddleware =
    require("../middleware/authMiddleware");

// =============================
// PRODUCT ROUTES
// =============================

// Get all products

router.get(
    "/",
    getProducts
);

// Get single product

router.get(
    "/:id",
    getSingleProduct
);

// Create product

router.post(
    "/",
    authMiddleware,
    createProduct
);

// Delete product

router.delete(
    "/:id",
    authMiddleware,
    deleteProduct
);

module.exports =
    router;