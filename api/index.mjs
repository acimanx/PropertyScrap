// Imports
import express from "express";

// App Imports
import setupServer from "./setup/server";
import setupAPI from "./setup/api";

// Create server
const app = express();
const router = express.Router()

// Setup server
setupServer(app)

// Setup database
setupAPI(app, router)

