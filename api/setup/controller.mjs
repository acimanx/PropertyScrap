import setupDatabase from "./database";

const db = setupDatabase()

const controller = {}

controller.getHome = async (req, res, next) => {
    try {

        let docs = []
        const mydb = await db
        await mydb
        .find('location_country like :location_country')
        .bind('location_country', '%')
        .execute(function (doc) {
            docs.push(doc.location_country)
        })
        res.json(docs)
    } catch (error) {
      next(error);
    }
  };

  controller.getAll = async (req, res, next) => {
    try {

        const docs = []
        const mydb = await db
        const lox = await mydb.select(['location_city']).
        where('location_city like :location_city').limit(10).bind('location_city','%').
        execute(doc => docs.push(doc))
        console.log(res.json(docs))
  
    } catch (error) {
      next(error);
    }
  };

  controller.getChart = async (req, res, next) => {
    try {
      res.send('home');
    } catch (error) {
      next(error);
    }
  };

  controller.postUpload = async (req, res, next) => {
    try {
      res.send('home');
    } catch (error) {
      next(error);
    }
  };

export default controller