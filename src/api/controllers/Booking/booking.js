var module = require('../../models/Booking/booking')

exports.getList = (req,res) =>{
   console.log("complete list here")
   module.getResult((err,emp , resp)=>{
       if(err)
       {
          res.send(err)
       }
      
       let news = emp.map((e)=>{
        
         resp.map((r)=>{
            if(e.event_id == r.id)
            {
              e.event_details=[{
               title:r.title,
               time_in:r.start,
               time_out:r.end,
               event_date:r.date,
               event_name:r.name,
               contact_details:r.contact_email,
               
               address:{
                  location:{
                     latitude:r.lat,
                     longitude:r.lon
                  }
               }
              },
           ]

         }
         else{
            e.event_details=[{
               time_in:null,
               time_out:null,
               event_date:null,
               event_name:null,
               contact_details:null,

              }]
         }
         })
         e.images=[{
              img1:e.img1,
              img2:e.img2,
              img3:e.img3,
              img4:e.img4,
              img5:e.img5

         }]
         delete e.lat 
         delete e.lon
         delete e.created_by
         delete e.created_at
           delete e.updated_at
           delete e.img1
           delete e.img2
           delete e.img3
           delete e.img4
           delete e.img5
           delete e.time_in,
             delete e.time_out,
               delete e.date,

               delete e.event_name,
               delete e.contact_email

         return e
      })
      res.send(news)
   })
}

exports.getbookingByID= (req,res)=>{
   module.getbookingByID(req.params.id,(err,emp,resp)=>{
      if(err)
      {
         res.send(err)
      }
      else{
         if (emp === null) {
            res.send({success:false,message:"No data found"})
         }
         else{
         let news = emp.map((e)=>{
        
            resp.map((r)=>{
               if(e.event_id == r.id)
               {
                 e.event_details=[{
                  title:r.title,
                  time_in:r.start,
                  time_out:r.end,
                  event_date:r.date,
                  event_name:r.name,
                  contact_details:r.contact_email,
                  
                  address:{
                     location:{
                        latitude:r.lat,
                        longitude:r.lon
                     }
                  }
                 },
              ]
   
            }
            else{
               e.event_details=[{
                  time_in:null,
                  time_out:null,
                  event_date:null,
                  event_name:null,
                  contact_details:null,
   
                 }]
            }
            })
            e.images=[{
                 img1:e.img1,
                 img2:e.img2,
                 img3:e.img3,
                 img4:e.img4,
                 img5:e.img5
   
            }]
            delete e.lat 
            delete e.lon
            delete e.created_by
            delete e.created_at
              delete e.updated_at
              delete e.img1
              delete e.img2
              delete e.img3
              delete e.img4
              delete e.img5
              delete e.time_in,
                delete e.time_out,
                  delete e.date,
   
                  delete e.event_name,
                  delete e.contact_email
   
            return e
         })
         res.send(news)
      }
   }

   })
}
exports.getbookingByCatID= (req,res)=>{
   module.getbookingByCatID(req.params.user_id,(err,emp,resp)=>{
      if(err)
      {
         res.send(err)
      }
      else{
        if (emp === null) {
         res.send({success:false,message:"No data found"})
        }
        else{
         let news = emp.map((e)=>{
        
            resp.map((r)=>{
               if(e.event_id == r.id)
               {
                 e.event_details=[{
                  title:r.title,
                  time_in:r.start,
                  time_out:r.end,
                  event_date:r.date,
                  event_name:r.name,
                  contact_details:r.contact_email,
                  
                  address:{
                     location:{
                        latitude:r.lat,
                        longitude:r.lon
                     }
                  }
                 },
              ]
   
            }
            else{
               e.event_details=[{
                  time_in:null,
                  time_out:null,
                  event_date:null,
                  event_name:null,
                  contact_details:null,
   
                 }]
            }
            })
            e.images=[{
                 img1:e.img1,
                 img2:e.img2,
                 img3:e.img3,
                 img4:e.img4,
                 img5:e.img5
   
            }]
            delete e.lat 
            delete e.lon
            delete e.created_by
            delete e.created_at
              delete e.updated_at
              delete e.img1
              delete e.img2
              delete e.img3
              delete e.img4
              delete e.img5
              delete e.time_in,
                delete e.time_out,
                  delete e.date,
   
                  delete e.event_name,
                  delete e.contact_email
   
            return e
         })
         res.send(news)
      }
   }

   })
}

exports.Addbooking=(req,res)=>{
   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.createbooking(data,(err,emp)=>{
         if(err)
         {
            res.send(err)
         }
         else{
            res.json({status:true, message:emp.message,data:emp.InsertId})
         }
      })
      console.log("valid data")
   }
}


// Update booking model
exports.Updatebooking=(req,res)=>{

   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.updatebooking(req.params.id,data,(err,emp)=>{
         if(err)
         {
            res.send(err)
         }
         else{
            res.json({status:true, message:"Success",data:emp.InsertId})
         }
      })
      console.log("valid data")
   }

}
exports.UpdateUserbooking=(req,res)=>{

   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.updateUserbooking(req.params.id,data,(err,emp)=>{
         if(err)
         {
            res.send(err)
         }
         else{
            res.json({status:true, message:emp.message,data:emp.InsertId})
         }
      })
      console.log("valid data")
   }

}

//Confirm booking
exports.Confirmbooking=(req,res)=>{

   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.confirmbooking(req.params.id,data,(err,emp)=>{
         if(err)
         {
            res.send(err)
         }
         else{
            res.json({status:true, message:"Success",data:emp.InsertId})
         }
      })
      console.log("valid data")
   }

}

//Has Accounts
exports.updateAccount=(req,res)=>{

   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.updateAccount(req.params.email,data,(err,emp)=>{
         if(err)
         {
            res.send(err)
         }
         else{
            res.json({status:true, message:"Success",data:emp.InsertId})
         }
      })
      console.log("valid data")
   }

}

// Delete booking

exports.deletebooking = (req,res) =>{
   module.deletebooking(req.params.id,(err,result)=>{
      if (err)
      {
         res.send(err)
      }
      else
      {
         res.json({status:true, message:"Deleted Successfully"})
      }

   })
}