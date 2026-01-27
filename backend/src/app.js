// Express server setup with CORS middleware
// const cors = require("cors");
// const express = require("express");

import cors from "cors";
import express from "express";
import routes from "./routes/index.js";

const app = express();

// CORS configuration
app.use(cors({
    origin: ['http://localhost:5173', 
            process.env.FRONTEND_URL || ''],
}));

// Body parser middleware
app.use(express.json());

// Use routes
app.use("/api", routes);

// 404 fallback
app.use((req, res) => res.status(404).json({ error: "Not found" }));

export default app;