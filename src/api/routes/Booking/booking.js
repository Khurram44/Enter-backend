const express = require('express')
 //import router
 const router = express.Router()

 //import employee controller
 const UserController = require("../../controllers/Booking/booking");
 router.get('/', UserController.getList)
 router.get('/:id',UserController.getbookingByID)
 router.get('/Id/:user_id',UserController.getbookingByCatID)
 router.post('/',UserController.Addbooking)
 router.delete('/delete/:id',UserController.deletebooking)
 router.put('/update/:id',UserController.Updatebooking)
 router.put('/update/user/:id',UserController.UpdateUserbooking)
 router.put('/has-account/:email',UserController.updateAccount)
    router.put('/confirm/:id',UserController.Confirmbooking)
 
 //export router for getting access
 module.exports = router