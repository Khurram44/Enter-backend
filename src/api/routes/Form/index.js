const express = require('express')
 //import router
 const router = express.Router()

 //import employee controller
 const UserController = require("../../controllers/Form/index");
 router.get('/', UserController.getList)
 router.get('/:id',UserController.getEventsByID)
 router.get('/category/:category',UserController.getEventsByCatID)
 router.post('/category/:category',UserController.getEventsByCatIDB)
 router.put("/images/update/:id",UserController.updateImages)
  router.post('/',UserController.AddEvents)
 router.delete('/delete/:id',UserController.deleteEvents)
 router.put('/update/:id',UserController.UpdateEvents)
 router.put('/has-account/:email',UserController.updateAccount)
 
 //export router for getting access
 module.exports = router