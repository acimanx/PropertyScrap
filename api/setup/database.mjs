// Imports
import mysqlx from '@mysql/xdevapi';

// Config Imports
import configDatabase from './config/database.json'

// Create and test new database session
console.info('SETUP - Connecting to session...')

const session = mysqlx.getSession(configDatabase)
console.info('INFO - Database connected.')

export default async function(app) {
  try {
  const establishedSession = await session
  // Get schema
  const schema = await establishedSession.getSchema(configDatabase.schema); 
  // Create schema if not present
  if (!(await schema.existsInDatabase())) { await establishedSession.createSchema(configDatabase.schema); } 
  // if (!(await schema.existsInDatabase())) { await establishedSession.createSchema(configDatabase.schema); } 

  // Create collection
  // await schema.createCollection('houses'); 
  // const collection = await schema.getCollection('houses'); 

  // console.info('INFO - Schemas deployed.')

const table = schema.getTable('houses')

  return table
  
  } catch (err) {
    throw err
  }
}
