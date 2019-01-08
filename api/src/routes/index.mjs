import fs from 'fs';
import fetch from 'node-fetch';
import validate from '../props/validate';
import normalize from '../props/normalize';
import housesArrayProduce from '../props/makeArray';
import statusArray from '../props/statusArray';
import mysql from '../../setup/database';
import express from 'express';
const router = express.Router();

console.log(router)

router.get('/', async (req, res, next) => {
  const promise = new Promise(async (resolve, reject) => {
    const query = 'SELECT location_city, count(*) AS Count FROM houses GROUP BY location_city';
    await mysql.query(query, (err, results, fields) => {
      if (err) reject(err);
      else {
        resolve(results);
      }
    });
  });
  const data = await promise;
  if (data.length < 1) return res.status(301).json({ message: 'There are no cities!' });
  else {
    return res.status(200).json(data);
  }
});

router.get('/layer', async (req, res, next) => {
  const data = await retrieveAllHouses(null);
  if (data.length < 1) return res.status(301).json({ message: 'There are no houses!' });
  else {
    return res.status(200).json(data);
  }
});

router.get('/layer/search', async (req, res, next) => {
  const reqQuery = { city: req.query.city, limit: req.query.limit };
  const data = await retrieveAllHouses(reqQuery);
  if (data.length < 1) return res.status(301).json({ message: 'There are no houses!' });
  else {
    return res.status(200).json(data);
  }
});

router.get('/status', async (req, res, next) => {
  const { city } = req.query;
  const promise = new Promise(async (resolve, reject) => {
    const query = 'SELECT * FROM city_status WHERE city = ?';
    await mysql.query(query, [city], (err, results, fields) => {
      if (!err) resolve(results);
      else reject(err);
    });
  });
  const data = await promise;
  if (data.length < 1) return res.status(301).json({ message: 'There are no cities!' });
  else {
    return res.status(200).json(data);
  }
});

async function retrieveAllHouses(reqQuery) {
  return new Promise(async (resolve, reject) => {
    if (reqQuery) {
      const { city, limit } = reqQuery;
      const query = 'SELECT * FROM houses WHERE location_city=? LIMIT ?';
      await mysql.query(query, [city, Number(limit)], (err, results, fields) => {
        if (!err) resolve(results);
        else reject(err);
      });
    } else {
      const query = 'SELECT * FROM houses';
      await mysql.query(query, (err, results, fields) => {
        if (!err) resolve(results);
        else reject(err);
      });
    }
  });
}

// router.post('/add', upload.single('file'), async (req, res, next) => {
//   const xx = req.file.path;
//   const myFile = `./${xx}`;

//   const data = await readJsonFile(myFile);
//   const myData = JSON.parse(data);
//   if (Array.isArray(myData) && myData.length < 1) {
//     res.status(404).json({ message: 'The json file is empty!' });
//   } else if (emptyCheck(myData)) {
//     res.status(404).json({ message: 'The json file is empty!' });
//   } else {
//     const report = validLoop(myData);
//     //res.status(200).json(report.errReport);
//     const filterdData = normLoop(report.validItems);
//     const houses = housesArrayProduce(filterdData);
//     const cityStatus = statusArray(filterdData);

//     const responseResult = insertIntoDatabase(report, houses, cityStatus);
//     res.status(200).json(responseResult);
//   }
// });

router.post('/add-url', async (req, res, next) => {
  const { link } = req.body;
  const data = await fetchJsonURL(link);
  if (Array.isArray(data) && data.length < 1) {
    res.status(404).json({ message: 'The json file is empty!' });
  } else if (emptyCheck(data)) {
    res.status(404).json({ message: 'The json file is empty!' });
  } else {
    const report = validLoop(data);
    const filterdData = normLoop(report.validItems);
    const houses = housesArrayProduce(filterdData);
    const cityStatus = statusArray(filterdData);

    const responseResult = insertIntoDatabase(report, houses, cityStatus);
    res.status(200).json(responseResult);
  }
});

function insertIntoDatabase(report, houses, cityStatus) {
  return {
    insertedItems: houses.length,
    errors: report.errReport.length,
    errMessages: report.errReport
  };
}

function emptyCheck(obj) {
  return !obj || Object.keys(obj).length === 0;
}

function validLoop(data) {
  const result = {};
  let final = [];
  let err = [];
  if (Array.isArray(data)) {
    data.forEach((el, i) => {
      let process = validate(el);
      if (process.valid) final.push(el);
      else {
        const report = {
          id: i + 1,
          messages: process.messages
        };
        err.push(report);
      }
    });
    result.validItems = final;
    result.errReport = err;
  } else {
    let process = validate(data);
    if (process.valid) final.push(data);
    else {
      const report = {
        id: 1,
        messages: process.messages
      };
      err.push(report);
    }
    result.validItems = final;
    result.errReport = err;
  }
  return result;
}

function normLoop(data) {
  let filterdData = [];
  data.forEach(el => {
    const item = normalize(el);
    filterdData.push(item);
  });
  return filterdData;
}

function fetchJsonURL(url) {
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err));
}

function readJsonFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

export default router;
