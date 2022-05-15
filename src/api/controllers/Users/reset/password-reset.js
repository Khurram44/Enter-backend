var module = require('../../../models/Users/reset/password-reset')

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

exports.getUsersByID= (req,res)=>{
    module.getUsersByID(req.params.hash,(err,Users)=>{
       if(err)
       {
          res.send(err)
       }
       else{
          console.log("Single Users data",Users)
          res.send(Users)
       }
 
    })
 }

 
exports.AddUsers=(req,res)=>{
    const data = new module(req.body)   
    console.log("request data", req.body)
 
    if(req.body.constructor === Object && Object.keys(req.body).length===0)
    {
       res.send(400).send({success:false,message:"Please fill up all the fields"})
    }
    else{
       module.createUsers(data,(err,emp)=>{
          if(err)
          {
             res.send(err)
          }
          else{
             res.json({status:emp.status, message:emp.message})
          }
       })
       console.log("valid data")
    }
 }