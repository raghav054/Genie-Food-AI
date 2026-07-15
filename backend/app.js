const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

// const request = require("request"); // Uncomment only if you use /proxy

const aiRoutes = require("./routes/ai.routes");
const errorMiddleware = require("./middlewares/errors");

// =======================
// Middleware
// =======================

// CORS
// Local:
// FRONTEND_URL=http://localhost:5173
//
// Production:
// FRONTEND_URL=https://your-vercel-app.vercel.app
//

console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);

// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === "production"
//         ? process.env.FRONTEND_URL
//         : "http://localhost:5173",
//     credentials: true,
//   }),
// );

app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming Origin:", origin);

      callback(null, true);
    },
    credentials: true,
  })
);

// Body Parser (Express built-in)
app.use(express.json({ limit: "30kb" }));
app.use(express.urlencoded({ extended: true, limit: "30kb" }));

// Cookies
app.use(cookieParser());

// File Upload
app.use(fileUpload());


// =======================
// Stripe Proxy (Optional)
// =======================
//
// Stripe Checkout DOES NOT require this.
// Keep it commented.
// Uncomment ONLY if you intentionally proxy Stripe assets.
//
// app.use("/proxy", (req, res) => {
//   const url = "https://checkout.stripe.com" + req.url;
//   req.pipe(request(url)).pipe(res);
// });


// =======================
// Routes
// =======================

const foodRouter = require("./routes/foodItem");
const restaurant = require("./routes/restaurant");
const menuRouter = require("./routes/menu");
const coupon = require("./routes/couponRoutes");
const order = require("./routes/order");
const auth = require("./routes/auth");
const payment = require("./routes/payment");
const cart = require("./routes/cart");

app.use("/api/v1/eats", foodRouter);
app.use("/api/v1/eats/menus", menuRouter);
app.use("/api/v1/eats/stores", restaurant);
app.use("/api/v1/eats/orders", order);
app.use("/api/v1/users", auth);
app.use("/api/v1", payment);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/eats/cart", cart);

app.use("/api/v1/ai", aiRoutes);


// =======================
// Pug Email Templates
// =======================

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "view"));


// =======================
// 404 Route
// =======================

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});


// =======================
// Global Error Handler
// =======================

app.use(errorMiddleware);

module.exports = app;