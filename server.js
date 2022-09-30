const app = require('./index.js')
const config = require('./app/config')
const MongoDB = require('./app/utils/mongodb')


MongoDB.connect(config.db.uri)
    .then(() => {
        console.log('Connected to the database!')

        const port = config.app.port
        app.listen(port, () => console.log('Listening on port ' + port))
    })
    .catch((err) => {
        console.log('Cannot connect to the database!, ERROR: ', err)
        process.exit()
    })


