const express = require('express')
 //import router
 const router = express.Router()

 //import employee controller
 const UserController = require("./cyphercontroller");

    router.post('/:id', UserController.getCypher)


    module.exports = router