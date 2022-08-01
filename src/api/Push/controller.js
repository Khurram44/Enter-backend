
var module = require('./notification')

exports.pushNotification = (req, res) => {
    const data = new module(req.body)
if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
       res.send(400).send({ success: false, message: "Please fill up all the fields" })
    }
    else {
       module.SendNotification(req.params.id, data, (err, emp) => {
          if (err) {
             res.send(err)
          }
          else {
             res.json({ status: true, message: emp, data: emp.InsertId })
          }
       })
       console.log("valid data")
    }
 
 }

 //Send notifications to All
 exports.pushNotificationAll = (req, res) => {
   const data = new module(req.body)
if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: "Please fill up all the fields" })
   }
   else {
      module.SendNotificationAll(req.params.id, data, (err, emp) => {
         if (err) {
            res.send(err)
         }
         else {
            res.json({ status: true, message: emp, data: emp.InsertId })
         }
      })
      console.log("valid data")
   }

}