const ApiError = require('../api_error')

const ContactService = require('../services/ContactService')
const MongoDB = require('../utils/mongodb')

exports.create = async (req, res, next) => {
    console.log(req.body)
    if (!req.body?.name) {
        return next(new ApiError(404, 'Name can not be empty!'))
    }

    try {
        const contactService = new ContactService(MongoDB.client)
        const document = await contactService.create(req.body)
        return res.send(document)
    } catch (err) {
        return next(new ApiError(500, 'An error occurred while creating the contact, (ERROR) ', err))
    }
}

exports.findAll = async (req, res, next) => {
    let documents = []

    try {
        const contactService = new ContactService(MongoDB.client)
        const { name } = req.query
        if (name) {
            documents = await contactService.findByName(name)
        } else {
            documents = await contactService.find({})
        }
    } catch (err) {
        return next (
            new ApiError(500, "An error occurred while retrieving documents, (ERROR) ", err)
        )
    }
    
    return res.send(documents)
}

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client)
        const documents = await contactService.findById(req.params.id)
        if (!documents) {
            return next(new ApiError(404, "Contact is not found"))
        }
        return res.send(documents)
    } catch (err) {
        return next(
            new ApiError(500, `Error retrieving contacts with id: ${req.params.id}`)
        )
    }
}

exports.update = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can not be empty!'))
    }

    try {
        const contactService = new ContactService(MongoDB.client)
        const document = contactService.update(req.params.id, req.body)
        if (!document) {
            return next( new ApiError(
                404, 'Contact not found!'
            ))
        }

        return res.send({message: 'Contact updated successfully!'})
    } catch (err) {
        return next (new ApiError (
            500, `Error update contact with id: ${req.params.id}`
        ))
    }
}

exports.deleteAll = (req, res, next) => {
    res.send({message: 'Delete handler!'})
}

exports.deleteOne = (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client)
        const document = contactService.deleteOne(req.params.id)
        if (!document) {
            return next(new ApiError(
                404, 'Contact not found'
            ))
        }

        res.send({message: 'Contact deleted successfully'})
    } catch (err) {
        return next(new ApiError(
            500, `Could'n delete contact with id: ${req.params.id}`
        ))
    }
}

exports.findAllFavorite  = (req, res, next) => {
    res.send({message: 'FindAllFavorite handler!'})
}

