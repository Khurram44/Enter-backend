const express = require('express')
//import router
const router = express.Router()


const UserController = require("./controller");
router.post('/:id', UserController.pushNotification)
router.post('/push/', UserController.pushNotificationAll)
module.exports = router
