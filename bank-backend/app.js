const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const customerRoutes = require("./routes/customers");
const txnRoutes = require("./routes/transactions");
const bankerRoutes = require("./routes/banker");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://bank-system-o9v2.vercel.app",
  "https://bank-system-6iee.vercel.app",
  "https://banker-system-bvlr.vercel.app",
  "https://bank-system-ejzj.vercel.app"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
};

// Must come before routes
app.use(cors(corsOptions));
// Handle preflight with same config
app.options("*", cors(corsOptions));

// -------- ROUTES --------
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/transactions", txnRoutes);
app.use("/api/banker", bankerRoutes);

// Health Check
app.get("/health", (req, res) => res.json({ status: "ok" }));

module.exports = app;
