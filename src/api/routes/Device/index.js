const express = require('express')
 //import router
 const router = express.Router()

 //import employee controller
 const UserController = require("../../controllers/Device/index");
 
  router.post('/',UserController.AddDevices)
 router.delete('/delete/:device_id',UserController.deleteDevices)
 
 //export router for getting access
 module.exports = router