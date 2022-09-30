const ApiError = require('../api_error')

const ContactService = require('../services/ContactService')
const MongoDB = require('../utils/mongodb')

exports.create = async (req, res, next) => {
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

exports.findAll = (req, res, next) => {
    res.send({message: 'FindAll handler!'})
}

exports.findOne = (req, res, next) => {
    res.send({message: 'FindOne handler!'})
}

exports.update = (req, res, next) => {
    res.send({message: 'Update handler!'})
}

exports.deleteAll = (req, res, next) => {
    res.send({message: 'Delete handler!'})
}

exports.deleteOne = (req, res, next) => {
    res.send({message: 'Delete handler!'})
}

exports.findAllFavorite  = (req, res, next) => {
    res.send({message: 'FindAllFavorite handler!'})
}

