var module = require('../../../models/Users/accounts/accounts')

exports.getList = (req,res) =>{
   // console.log("complete list here")
   module.getResult((err,emp)=>{
       if(err)
       {
          res.send(err)
       }
       console.log(emp)
       res.send(emp)
   })
}

exports.getAccountsByID= (req,res)=>{
   module.getAccountsByID(req.params.email_id,(err,Accounts)=>{
      if(err)
      {
         res.send(err)
      }
      else{
         console.log("Single Accounts data",Accounts)
         res.send(Accounts)
      }

   })
}


exports.AddAccounts=(req,res)=>{
   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.createAccounts(data,(err,emp)=>{
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


//Update Accounts model
// exports.UpdateAccounts=(req,res)=>{

//    const data = new module(req.body)   
//    console.log("request data", req.body)

//    if(req.body.constructor === Object && Object.keys(req.body).length===0)
//    {
//       res.send(400).send({success:false,message:"Please fill up all the fields"})
//    }
//    else{
//       module.updateAccounts(req.params.id,data,(err,emp)=>{
//          if(err)
//          {
//             res.send(err)
//          }
//          else{
//             res.json({status:true, message:"Success",data:emp.InsertId})
//          }
//       })
//       console.log("valid data")
//    }

// }


//Delete Accounts

exports.deleteAccounts = (req,res) =>{
   module.deleteAccounts(req.params.id,(err,result)=>{
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