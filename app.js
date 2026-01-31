import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import initSuperAdmin from "./config/initSuperAdmin.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Connect DB (only once in serverless)
await connectDB();
await initSuperAdmin();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:3000",
  "https://bugsprint-alpha.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);

// Health route (important for testing)
app.get("/", (req, res) => {
  res.json({ success: true, message: "Backend running on Vercel 🚀" });
});

export default app;
