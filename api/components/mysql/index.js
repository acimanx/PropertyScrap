"use strict";

const mysql = require('mysql');

const db = mysql.createConnection({
    password: 'root',
    user: 'root',
    host: 'localhost',
    port: 3306,
    database: 'mydb'
  });
  
  //CONNECT
  db.connect( (err) => {
    if(err) throw err;
    console.log('MySQL Connected!');
  });
  

module.exports = db;


// "use strict";

// const mysqlx = require('@mysql/xdevapi');

// const configureDatabase = async function() {

//     const session = await mysqlx.getSession({ user: 'root', password: '01020304'});
//     const schema = session.getSchema('mySchema'); 
    
//     if (!(await schema.existsInDatabase())) { await session.createSchema('mySchema'); } 
    
//     await schema.createCollection('sessions', { ReuseExistingObject: true }); 
    
//     const collections = await schema.getCollections(); 

//     return collections
  
// }

// module.exports = configureDatabase