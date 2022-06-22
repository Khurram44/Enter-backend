var module = require('../../models/Booking/booking')

exports.getList = (req,res) =>{
   console.log("complete list here")
   module.getResult((err,emp)=>{
       if(err)
       {
          res.send(err)
       }
       console.log(emp)
       res.send(emp)
   })
}

exports.getbookingByID= (req,res)=>{
   module.getbookingByID(req.params.email,(err,booking)=>{
      if(err)
      {
         res.send(err)
      }
      else{
         console.log("Single booking data",booking)
         res.send(booking)
      }

   })
}
exports.getbookingByCatID= (req,res)=>{
   module.getbookingByCatID(req.params.user_id,(err,booking)=>{
      if(err)
      {
         res.send(err)
      }
      else{
         console.log("Single booking data",booking)
         res.send(booking)
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