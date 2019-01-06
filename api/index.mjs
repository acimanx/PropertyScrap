"use strict";

// Imports

import express from "express";
import cors from "cors";

// App Imports
import list from "./components";

// Create server
const app = express();

// Enable CORS
app.use(cors());

// Request body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", list);

const server = {
  host: "http://localhost",
  port: 8080
};

const port = process.env.PORT || server.port;
app.listen(port, () => {
  console.log(`Listening on ${server.host}:${port} ..`);
});
