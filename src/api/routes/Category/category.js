const express = require('express')
 //import router
 const router = express.Router()

 //import employee controller
 const UserController = require("../../controllers/Category/category");
 router.get('/', UserController.getList)
 router.get('/:id',UserController.getcategoryByID)
  router.post('/',UserController.Addcategory)
 router.delete('/delete/:id',UserController.deletecategory)
 router.put('/update/:id',UserController.Updatecategory)
 
 //export router for getting access
 module.exports = router