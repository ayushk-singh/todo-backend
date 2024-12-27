import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRouters.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

//mongodb connection
connectDB();

// routes
app.use("/api/tasks", taskRoutes);

// start server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
