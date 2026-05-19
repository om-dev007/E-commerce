const db =
    require("../config/db");

// =============================
// GET ALL PRODUCTS
// =============================

const getProducts =
    (req, res) => {

        const query =
            "SELECT * FROM products ORDER BY id DESC";

        db.query(
            query,
            (error, results) => {

                if(error){

                    return res.status(500).json({

                        success: false,

                        error

                    });

                }

                res.status(200).json({

                    success: true,

                    products: results

                });

            }
        );

    };

// =============================
// GET SINGLE PRODUCT
// =============================

const getSingleProduct =
    (req, res) => {

        const { id } =
            req.params;

        const query =
            "SELECT * FROM products WHERE id = ?";

        db.query(
            query,
            [id],
            (error, results) => {

                if(error){

                    return res.status(500).json({

                        success: false,

                        error

                    });

                }

                if(results.length === 0){

                    return res.status(404).json({

                        success: false,

                        message:
                            "Product not found"

                    });

                }

                res.status(200).json({

                    success: true,

                    product: results[0]

                });

            }
        );

    };

// =============================
// CREATE PRODUCT
// =============================

const createProduct =
    (req, res) => {

        const {

            name,
            description,
            price,
            image,
            category,
            stock,
            featured

        } = req.body;

        if(
            !name ||
            !price
        ){

            return res.status(400).json({

                success: false,

                message:
                    "Name and price are required"

            });

        }

        const query =
            `
            INSERT INTO products
            (
                name,
                description,
                price,
                image,
                category,
                stock,
                featured
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

        db.query(
            query,
            [
                name,
                description,
                price,
                image,
                category,
                stock || 0,
                featured || false
            ],
            (error, result) => {

                if(error){

                    return res.status(500).json({

                        success: false,

                        error

                    });

                }

                res.status(201).json({

                    success: true,

                    message:
                        "Product created successfully",

                    productId:
                        result.insertId

                });

            }
        );

    };

// =============================
// DELETE PRODUCT
// =============================

const deleteProduct =
    (req, res) => {

        const { id } =
            req.params;

        const query =
            "DELETE FROM products WHERE id = ?";

        db.query(
            query,
            [id],
            (error, result) => {

                if(error){

                    return res.status(500).json({

                        success: false,

                        error

                    });

                }

                res.status(200).json({

                    success: true,

                    message:
                        "Product deleted successfully"

                });

            }
        );

    };

// =============================
// EXPORTS
// =============================

module.exports = {

    getProducts,
    getSingleProduct,
    createProduct,
    deleteProduct

};