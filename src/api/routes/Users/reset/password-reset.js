const express = require('express')
 //import router
 const router = express.Router()

const resetController = require("../../../controllers/Users/reset/password-reset")

router.get("/:hash",resetController.getUsersByID)
router.post("/",resetController.AddUsers)

 module.exports = router