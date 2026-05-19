const express =
    require("express");

const cors =
    require("cors");

const dotenv =
    require("dotenv");

// =============================
// CONFIG
// =============================

dotenv.config();

// =============================
// DATABASE
// =============================

require("./config/db");

// =============================
// ROUTES
// =============================

const productRoutes =
    require("./routes/productRoutes");

const authRoutes =
    require("./routes/authRoutes");

const orderRoutes =
    require("./routes/orderRoutes");

// =============================
// APP
// =============================

const app =
    express();

// =============================
// MIDDLEWARE
// =============================

app.use(cors());

app.use(express.json());

// =============================
// API ROUTES
// =============================

app.use(
    "/api/products",
    productRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);

// =============================
// HOME ROUTE
// =============================

app.get("/", (req, res) => {

    res.send(
        "E-Commerce Backend Running 🚀"
    );

});

// =============================
// SERVER START
// =============================

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});