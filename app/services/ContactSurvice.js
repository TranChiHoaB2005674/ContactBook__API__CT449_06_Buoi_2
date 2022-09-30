const { ObjectId } = require("mongodb")

class ContactService {
    constructor (client) {
        this.contact = client.db().collection('contacts')
    }

    async extractContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite
        }

        Object.keys(contact).forEach (
            key => contact[key] === undefined && delete contact[key]
        )
    }

    async create (payload) {
        const contact = this.extractContactData(payload)
        const result = await this.contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true } },
            { returnDocument: 'after', upset: true }
        )

        return result.value
    }
}

module.exports = ContactService

