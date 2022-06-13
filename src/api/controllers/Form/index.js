var module = require('../../models/Form/index')

exports.getList = (req,res) =>{
   console.log("complete list here")
   module.getResult((err,emp)=>{
       if(err)
       {
          res.send(err)
       }
       console.log(emp)
       let news = emp.map((e)=>{
          e.location= [{
               lat:e.lat,
               lng:e.lon
          }]
          delete e.lat 
          delete e.lon
          delete e.created_by
          delete e.created_at
            delete e.updated_at
          return e
       })
       res.send(news)
   })
}

exports.getEventsByID= (req,res)=>{
   module.getEventsByID(req.params.id,(err,Events)=>{
      if(err)
      {
         res.send(err)
      }
      else{
         console.log("Single Events data",Events)
         res.send(Events)
      }

   })
}

exports.getEventsByCatID= (req,res)=>{
    module.getEventsByCatID(req.params.category,(err,Events)=>{
       if(err)
       {
          res.send(err)
       }
       else{
          console.log("Single Events data",Events)
          res.send(Events)
       }
 
    })
 }
 

exports.AddEvents=(req,res)=>{
   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.createEvents(data,(err,emp)=>{
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


// Update Events model
exports.UpdateEvents=(req,res)=>{

   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.updateEvents(req.params.id,data,(err,emp)=>{
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

// Delete Events

exports.deleteEvents = (req,res) =>{
   module.deleteEvents(req.params.id,(err,result)=>{
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