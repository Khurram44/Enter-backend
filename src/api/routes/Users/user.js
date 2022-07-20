const express = require('express')
 //import router
 const router = express.Router()

 //import employee controller
 const UserController = require("../../controllers/Users/user");
 router.get('/', UserController.getList)
 router.get('/:email',UserController.getUsersByID)
  router.post('/',UserController.AddUsers)
 router.delete('/delete/:id',UserController.deleteUsers)
 router.put('/update/:email',UserController.UpdateUsers)
 router.put('/suspend/:id',UserController.updateSuspend)
 router.put('/remsuspend/:id',UserController.removeSuspend)
 router.put('/del/:id',UserController.updateDelete)
 router.put('/restore/:id',UserController.restoreDelete)
 router.put('/has-account/:email',UserController.updateAccount)
 
 //export router for getting access
 module.exports = router