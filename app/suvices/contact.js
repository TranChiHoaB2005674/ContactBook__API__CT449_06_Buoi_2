const { ObjectId } = require("mongodb")

class Contact {
    constructor (client) {
        this.contact = client.db().collection('contacts')
    }
}

module.exports = Contact

