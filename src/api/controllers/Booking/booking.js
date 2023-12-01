var module = require('../../models/Booking/booking')

exports.getList = (req, res) => {
   console.log("complete list here")
   module.getResult((err, emp, resp) => {
      if (err) {
         res.send(err)
      }
      else if(emp.status == false)
      {
         res.send({status:false , message:"No record found"})
      }

     else { 
      let news = emp.map((e) => {

         resp.map((r) => {
            // console.log("start",r.is_selectable)
            if(e.event_id == r.id){
            if (r.is_selectable == 0) {
               console.log("start", r.title)

               e.title = r.title,
               e.start = r.start,
               e.end = r.end,
               e.event_date = r.date,
               e.event_name = r.name,
               e.contact_details = r.contact_email
               e.is_selectable = false
              

            }
            else if (r.is_selectable == 1) {
               e.title = r.title,
               e.is_selectable = true
               e.start = e.time_in,
               e.end = e.time_out,
               e.event_date = e.date,
               e.event_name = r.name,
               e.contact_details = r.contact_email

            }
           
            }
           
         })

         delete e.lat
         delete e.lon
         delete e.created_by
         // delete e.created_at
         delete e.updated_at
         delete e.time_in,
            delete e.time_out,
            delete e.date,

            delete e.event_name,
            delete e.contact_email

         return e
      })
      res.send(news.filter(f=>f.hasOwnProperty('event_date')))}
   })
}

exports.getbookingByID = (req, res) => {
   module.getbookingByID(req.params.id, (err, emp, resp) => {
      if (err) {
         res.send(err)
      }
      else {
         if (emp === null) {
            res.send({ success: false, message: "No data found" })
         }
         else {
            let news = emp.map((e) => {

               resp.map((r) => {
                  if(e.event_id == r.id){
                     if (r.is_selectable == 0) {
                        console.log("start", r.title)
         
                        e.title = r.title,
                        e.start = r.start,
                        e.end = r.end,
                        e.event_date = r.date,
                        e.event_name = r.name,
                        e.contact_details = r.contact_email
                        e.is_selectable = false
                       
         
                     }
                     else if (r.is_selectable == 1) {
                        e.title = r.title,
                        e.start = e.time_in,
                        e.end = e.time_out,
                        e.event_date = e.date,
                        e.event_name = r.name,
                        e.contact_details = r.contact_email
                        e.is_selectable = true
         
                     }
                    
                     }
               })

               delete e.lat
               delete e.lon
               delete e.created_by
               // delete e.created_at
               delete e.updated_at
               delete e.time_in,
                  delete e.time_out,
                  delete e.date,

                  delete e.event_name,
                  delete e.contact_email
               delete e.hash

               return e
            })
            res.send(news.filter(f=>f.hasOwnProperty('event_date')))
         }
      }

   })
}


exports.checkHash = (req, res) => {
   module.checkHash(req.params.id, (err, emp) => {
      if (err) {
         res.send(err)
      }
      else {
         if (emp === null) {
            res.send({ success: false, message: emp.message })
         }
         else {
            res.send(emp)
         }
      }

   })
}
exports.getbookingByCatID = (req, res) => {
   module.getbookingByCatID(req.params.user_id, (err, emp, resp) => {
      if (err) {
         res.send(err)
      }
      else {
         // console.log(resp.length,"resp")
         if (emp.status == false) {
            res.send({ success: false, message: "No data found" })
         }
         else {
            let tobeRemoved = []
            let news = emp.map((e) => {
               resp.map((r) => {
                  if(e.event_id == r.id)
                     // if (r.is_selectable == 0) {
                     //    console.log("start", r.title)
         
                     //    e.title = r.title,
                     //    e.start = r.start,
                     //    e.end = r.end,
                     //    e.event_date = r.date,
                     //    e.event_name = r.name,
                     //    e.contact_details = r.contact_email
                     //    e.is_selectable = false
                       
         
                     // }
                     // else if (r.is_selectable == 1)
                      {
                        e.title = r.title,
                        e.start = e.time_in,
                        e.end = e.time_out,
                        e.event_date = e.date,
                        e.event_name = r.name,
                        e.contact_details = r.contact_email
                        e.is_selectable = true
         
                     
                    
                     }
                   if(e.event_date === "0000-00-00")
                   {
                     e.event_date= new Date()
                   }
               })

               delete e.lat
               delete e.lon
               delete e.created_by
               // delete e.created_at
               delete e.updated_at
               delete e.time_in,
                  delete e.time_out,
                  delete e.date,
                  delete e.hash
               delete e.event_name,
                  delete e.contact_email

               return e
            })
            res.send(news.filter(f=> f.hasOwnProperty('event_date')))
            // .filter(f=> new Date().toISOString()<= new Date(f.event_date).toISOString())
         }
      }

   })
}

exports.getbookingByCatIDRejected = (req, res) => {
   module.getbookingByCatIDRejected(req.params.user_id, (err, emp, resp) => {
      if (err) {
         res.send(err)
      }
      else {
         // console.log(resp.length,"resp")
         if (emp.status == false) {
            res.send({ success: false, message: "No data found" })
         }
         else {
            let news = emp.map((e) => {

               resp.map((r) => {
                  if(e.event_id == r.id)
                     // if (r.is_selectable == 0) {
                     //    console.log("start", r.title)
         
                     //    e.title = r.title,
                     //    e.start = r.start,
                     //    e.end = r.end,
                     //    e.event_date = r.date,
                     //    e.event_name = r.name,
                     //    e.contact_details = r.contact_email
                     //    e.is_selectable = false
                       
         
                     // }
                     // else if (r.is_selectable == 1)
                      {
                        e.title = r.title,
                        e.start = e.time_in,
                        e.end = e.time_out,
                        e.event_date = e.date,
                        e.event_name = r.name,
                        e.contact_details = r.contact_email
                        e.is_selectable = true
         
                     
                    
                     }
               })

               delete e.lat
               delete e.lon
               delete e.created_by
               // delete e.created_at
               delete e.updated_at
               delete e.time_in,
                  delete e.time_out,
                  delete e.date,
                  delete e.hash
               delete e.event_name,
                  delete e.contact_email

               return e
            })
            // news.filter(f=> f.hasOwnProperty('event_date'))
            res.send(news.filter(f=> f.status == 2 && f.hasOwnProperty('event_date')))
         }
      }

   })
}

exports.Addbooking = (req, res) => {
   const data = new module(req.body)
   console.log("request data", req.body)

   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: "Please fill up all the fields" })
   }
   else {
      module.createbooking(data, (err, emp) => {
         if (err) {
            res.send(err)
         }
         else {
            res.json({ status: true, message: emp.message, data: emp.InsertId })
         }
      })
      console.log("valid data")
   }
}


// Update booking model
exports.Updatebooking = (req, res) => {

   const data = new module(req.body)
   console.log("request data", req.body)

   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: "Please fill up all the fields" })
   }
   else {
      module.updatebooking(req.params.order_no, data, (err, emp) => {
         if (err) {
            res.send(err)
         }
         else {
            res.json({ status: true, message: emp.message, data: emp.InsertId })
         }
      })
      console.log("valid data")
   }

}
exports.UpdateUserbooking = (req, res) => {

   const data = new module(req.body)
   console.log("request data", req.body)

   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: "Please fill up all the fields" })
   }
   else {
      module.updateUserbooking(req.params.id, data, (err, emp) => {
         if (err) {
            res.send(err)
         }
         else {
            res.json({ status: true, message: emp.message, data: emp.InsertId })
         }
      })
      console.log("valid data")
   }

}

//Confirm booking
exports.Confirmbooking = (req, res) => {

   const data = new module(req.body)
   console.log("request data", req.body)

   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: "Please fill up all the fields" })
   }
   else {
      module.confirmbooking(req.params.order_no, data, (err, emp) => {
         if (err) {
            res.send(err)
         }
         else {
            res.json({ status: emp.status, message: emp.message, data: emp.InsertId })
         }
      })
      console.log("valid data")
   }

}

//Has Accounts
exports.updateAccount = (req, res) => {

   const data = new module(req.body)
   console.log("request data", req.body)

   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: "Please fill up all the fields" })
   }
   else {
      module.updateAccount(req.params.email, data, (err, emp) => {
         if (err) {
            res.send(err)
         }
         else {
            res.json({ status: true, message: "Success", data: emp.InsertId })
         }
      })
      console.log("valid data")
   }

}

// Delete booking

exports.deletebooking = (req, res) => {
   module.deletebooking(req.params.id, (err, result) => {
      if (err) {
         res.send(err)
      }
      else {
         res.json({ status: result.status, message: result.message })
      }

   })
}

exports.ChangeTimeRequest = (req, res) => {

   const data = new module(req.body)
   console.log("request data", req.body)

   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: "Please fill up all the fields" })
   }
   else {
      module.changeTimeRequest(req.params.id, data, (err, emp) => {
         if (err) {
            res.send(err)
         }
         else {
            res.json({ status: true, message: "Success", data: emp.InsertId })
         }
      })
      console.log("valid data")
   }

}

exports.ConfirmChangeTimeRequest = (req, res) => {

   const data = new module(req.body)
   console.log("request data", req.body)

   if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      res.send(400).send({ success: false, message: "Please fill up all the fields" })
   }
   else {
      module.ConfirmchangeTimeRequest(req.params.id, data, (err, emp) => {
         if (err) {
            res.send(err)
         }
         else {
            res.json({ status: true, message: "Success", data: emp.InsertId })
         }
      })
      console.log("valid data")
   }

}