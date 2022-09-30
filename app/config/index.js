const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/ContactBook'
    }
}

module.exports = config
