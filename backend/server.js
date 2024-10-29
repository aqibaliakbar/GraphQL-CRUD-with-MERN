import express from "express";
import dotenv from "dotenv";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { root, schema } from "./schema/schema.js";
import connectDB from "./config/db.js";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Connect to MongoDB
connectDB();

// GraphQL endpoint
app.use(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Serve GraphiQL IDE
app.get("/", (req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  console.log(`GraphiQL interface available at http://localhost:${port}`);
});
