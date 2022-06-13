const express = require('express')
 //import router
 const router = express.Router()

 //import employee controller
 const UserController = require("../../../controllers/Admin/User/user");
 router.get('/', UserController.getList)
  router.post('/',UserController.AddAgents)
 router.delete('/delete/:id',UserController.deleteAgents)
 router.put('/update/:email',UserController.UpdateAgents)
 
 //export router for getting access
 module.exports = router