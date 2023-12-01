
var module = require("../../../models/Users/auth/index")
var nodemailer = require('nodemailer');



 const sendNewMail=(email)=>{

    let transporter = nodemailer.createTransport({
       host: process.env.HOST,
       port: 587,
       secure: false,
       requireTLS: true,
       auth: {
           user: process.env.EMAIL,
           pass: process.env.PASSWORD
       }
    });
    
    let mailOptions = {
       from: process.env.EMAIL,
       to: email,
       subject: 'KYC Verification Status',
       html : `<div>
          <h1>Your KYC Partners</h1>
          <p>Your KYC is verified successfully is line 1></p>
          <p>This is line 2</p>
          <p>this is line 3</p>
       </div>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           return console.log(error.message);
       }
       console.log('success');
    });
    
 }
 

exports.sendEmail = (req, res) => {
   const data = new module(req.body)
   console.log("request data", data)
   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      
      sendNewMail(data.email)
      res.json({status:true,message:"Email sent"})
      console.log("valid data")
   }
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
            res.json({status:true, message:emp.message,data:data.first_name})
         }
      })
      console.log("valid data")
   }
}

exports.LoginUser=(req,res)=>{
   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.loginUsers(data,(err,emp)=>{
         if(err)
         {
            res.send(err)
         }
         else{
           
            res.json({status:true, message:emp.message,data:{id:emp.id , name:emp.user_name , email:emp.email , phone:emp.phone},token:emp.token})
         }
      })
      console.log("valid data")
   }
}

exports.LoginAgents=(req,res)=>{
   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.loginAgents(data,(err,emp)=>{
         if(err)
         {
            res.send(err)
         }
         else{
           
            res.json({status:true, message:emp.message,data:emp.id,name:emp.name,token:emp.token})
         }
      })
      console.log("valid data")
   }
}


// Update Users model
exports.UpdateUsers=(req,res)=>{

   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.updateUsers(req.params.email,data,(err,emp)=>{
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