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
 router.put('/update/:order_no',UserController.Updatebooking)
   router.get('/hash/checkhash/:id',UserController.checkHash)
 router.put('/update/user/:order_no',UserController.UpdateUserbooking)
 router.put('/has-account/:email',UserController.updateAccount)
    router.put('/confirm/:id',UserController.Confirmbooking)
    router.put('/changetime/:id',UserController.ChangeTimeRequest)
    router.put('/changetime/confirm/:id',UserController.ConfirmChangeTimeRequest)
 
 //export router for getting access
 module.exports = router