const express = require('express')
 //import router
 const router = express.Router()

 //import employee controller
 const UserController = require("../../controllers/Feedback/Feedback");
 router.get('/', UserController.getList)
 router.get('/:id',UserController.getFeedbackByID)
  router.post('/',UserController.AddFeedback)
 router.delete('/delete/:id',UserController.deleteFeedback)
 router.put('/update/:id',UserController.UpdateFeedback)
 
 //export router for getting access
 module.exports = router