// App Imports
import controller from "./controller"

console.info('SETUP - Providing api...')

export default async function(app, router) {

    app.get('/', controller.getHome)
    app.get('/all', controller.getAll)
    app.get('/chart', controller.getChart)
    app.post('/upload', controller.postUpload)
    
}