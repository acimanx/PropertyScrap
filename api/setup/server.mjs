// App Imports
import config from './config/main.json'

// Imports
import cors from 'cors'
import express from "express";

// Sync database tables and start server
export default app => {
  console.info('SETUP - Loading modules...')

  // Enable CORS
  app.use(cors())

  // Request body parser
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  console.info('SETUP - Starting server...')

  // Start web server
  app.listen(config.port, error => {
    if (error) {
      console.error('ERROR - Unable to start server.')
    } else {
      console.info(`INFO - Server started on port ${config.port}.`)
    }
  })
}
