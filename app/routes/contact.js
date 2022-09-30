const express = require('express')
const contactController = require('../controllers/ContactController')

const router = express.Router()

router.route('/')
    .get(contactController.findAll)
    .post(contactController.update)
    .delete(contactController.deleteAll)

router.route('/favorite')
    .get(contactController.findAllFavorite)

router.route('/:id')
    .get(contactController.findOne)
    .put(contactController.update)
    .delete(contactController.deleteOne)

module.exports = router
