var module = require('../../models/Feedback/Feedback')

exports.getList = (req,res) =>{
   console.log("complete list here")
   module.getResult((err,emp,resp)=>{
       if(err)
       {
          res.send(err)
       }
       let news = emp.map((e) => {

        resp.map((r) => {
           // console.log("start",r.is_selectable)
           if(e.user_id == r.id){
          
              console.log("start", r.title)

              e.feedback = e.feedback,
              e.username = r.user_name,
              e.email = r.email
           
          
           }
          
        })

        delete e.user_id
        
        return e
     })
     res.send(news)
   })
}

exports.getFeedbackByID= (req,res)=>{
   module.getFeedbackByID(req.params.id,(err,Feedback)=>{
      if(err)
      {
         res.send(err)
      }
      else{
         console.log("Single Feedback data",Feedback)
         res.send(Feedback)
      }

   })
}


exports.AddFeedback=(req,res)=>{
   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.createFeedback(data,(err,emp)=>{
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


// Update Feedback model
exports.UpdateFeedback=(req,res)=>{

   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.updateFeedback(req.params.id,data,(err,emp)=>{
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




// Delete Feedback

exports.deleteFeedback = (req,res) =>{
   module.deleteFeedback(req.params.id,(err,result)=>{
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