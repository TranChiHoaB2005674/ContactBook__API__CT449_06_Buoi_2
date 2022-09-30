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

        return contact
    }

    async create (payload) {
        const contact = await this.extractContactData(payload)
        const result = await this.contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true } },
            { returnDocument: 'after', upsert: true }
        )

        return result.value
    }

    async find(filter) {
        const cursor = await this.contact.find(filter)
        return await cursor.toArray()
    }

    async findByName(name) {
        return await (await this.contact.find({
            name: { $regex: new RegExp(name), $options: 'i'}
        })).toArray()
    }

    async findById(id) {
        return  await this.contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        })
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        }

        const contact = await this.extractContactData(payload)
        const result = await this.contact.updateOne(
            filter,
            { $set: contact },
            { returnDocument: 'after' }
        )

        return result.value
    }

    async deleteOne(id) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null
        }

        const result = await this.contact.deleteOne(filter)

        return result.value
    }

    async deleteAll() {
        const result = await this.contact.deleteMany({})

        return await result.deletedCount
    }

    async findFavorite() {
        const result = await this.contact.find({favorite: true})

        return await result.toArray()
    }
}

module.exports = ContactService

