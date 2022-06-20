const express = require('express')
 //import router
 const router = express.Router()

 //import employee controller
 const UserController = require("../../controllers/Booking/booking");
 router.get('/', UserController.getList)
 router.get('/:email',UserController.getbookingByID)
  router.post('/',UserController.Addbooking)
 router.delete('/delete/:id',UserController.deletebooking)
 router.put('/update/:id',UserController.Updatebooking)
 router.put('/has-account/:email',UserController.updateAccount)
 
 //export router for getting access
 module.exports = router