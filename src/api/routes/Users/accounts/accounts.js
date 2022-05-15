const express = require('express')
 //import router
 const router = require("express").Router();

 //import employee controller
//  const {checkToken} = require("../../../auth/token_validation")
 const UserController = require("../../../controllers/users/accounts/accounts");
 router.get('/',UserController.getList)
 router.get('/:email_id',UserController.getAccountsByID)
  router.post('/',UserController.AddAccounts)
 router.delete('/delete/:email_id',UserController.deleteAccounts)
//  router.put('/pricing/:hourly_rate',UserController.updateUserPrices)
 
 //export router for getting access
 module.exports = router