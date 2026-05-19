const express =
    require("express");

const router =
    express.Router();

const {

    signup,
    login

} = require(
    "../controllers/authController"
);

// =============================
// AUTH ROUTES
// =============================

router.post(
    "/signup",
    signup
);

router.post(
    "/login",
    login
);

// =============================
// TEST ROUTE
// =============================

router.get("/", (req, res) => {

    res.json({

        message:
            "Auth Routes Working"

    });

});

module.exports =
    router;