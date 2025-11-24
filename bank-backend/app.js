// const express = require("express");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const authRoutes = require("./routes/auth");
// const customerRoutes = require("./routes/customers");
// const txnRoutes = require("./routes/transactions");
// const bankerRoutes = require("./routes/banker");

// const app = express();

// app.use(express.json());
// app.use(cookieParser());


// const allowedOrigins = [
//   "http://localhost:5173", // customer
//   "http://localhost:5174",  // banker
//   "https://bank-system-o9v2.vercel.app/login",
//   "https://bank-system-6iee.vercel.app/"
// ];

// app.use((req, res, next) => {
//   const origin = req.headers.origin;

//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }

//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Requested-With"
//   );

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }

//   next();
// });

// // ROUTES
// app.use("/api/auth", authRoutes);
// app.use("/api/customers", customerRoutes);
// app.use("/api/transactions", txnRoutes);
// app.use("/api/banker", bankerRoutes);

// app.get("/health", (req, res) => res.json({ status: "ok" }));

// module.exports = app;









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

// -------- FIXED CORS CONFIG --------
const allowedOrigins = [
  "http://localhost:5173",     // customer frontend (local)
  "http://localhost:5174",     // banker frontend (local)
  "https://bank-system-o9v2.vercel.app",   // customer frontend (live)
  "https://bank-system-6iee.vercel.app",   // customer alternate deployment
  "https://banker-system-bvlr.vercel.app",  // banker frontend (live)
  "https://bank-system-ejzj.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests without origin (e.g. mobile apps, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

// Handle OPTIONS preflight globally
app.options("*", cors());

// -------- ROUTES --------
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/transactions", txnRoutes);
app.use("/api/banker", bankerRoutes);

// Health Check
app.get("/health", (req, res) => res.json({ status: "ok" }));

module.exports = app;
