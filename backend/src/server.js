import app from "./app.js";
import dotenv from "dotenv";

import { connectMongo, closeMongo } from "./db/mongo.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
await connectMongo();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

// Handle server shutdown
// includes closing MongoDB connection
// async function shutdown(signal) {
//     console.log(`\nReceived ${signal}. Shutting down...`);
//     server.close(async () => {
//       try {
//         await closeMongo();
//         console.log("Mongo connection closed.");
//         process.exit(0);
//       } catch (err) {
//         console.error("Error closing Mongo:", err);
//         process.exit(1);
//       }
//     });
//   }
  
//   process.on("SIGINT", () => shutdown("SIGINT"));   // Ctrl+C
//   process.on("SIGTERM", () => shutdown("SIGTERM")); // Docker/hosting stop