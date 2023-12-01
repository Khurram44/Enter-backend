var db = require('../../../database/database')

const crypto = require('crypto');
//create model/schema for table
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

console.log("ID",makeid(100));

var nodemailer = require('nodemailer');

const sendNewMail=(email,sethash)=>{

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
       subject: 'Password-Reset',
       html : `<div>
          <h1>Here is the Link to Update your password.</h1>
          <p>This is your one time activation link. It will be expired in a while</p>
          <a href=${`http://enterworld.it/reset-password/${sethash}`} target="_blank" >Reset Password</a>
          
       </div>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           return console.log(error.message);
       }
       console.log('success');
    });
    
 }
 
var Users = function(users) {

this.id = users.id;
this.email_id  = users.email_id;
this.hash = users.hash;
}   

Users.getResult = (result) => {
    db.query('SELECT * from hash', (err,res)=>{
        if(err){
            console.log('error while fetching', err)
            result(null,err)
        }
        else {
            console.log('fetched successfully', res)
            result(null,res)
        }
    })
}


Users.getUsersByID=(id,result)=>{
    db.query('SELECT * from hash WHERE hash=?',id,(err,res)=>{
        if(err)
        {
            console.log("error while fetching")
            result(null,err)

        }
        else{
            console.log("selected by ID")
            result(null,res)
        }
    })
}

Users.createUsers=(EmpReqData, result)=>{

    let checkDb = db.query('SELECT * from user where email = ?',EmpReqData.email_id,(err,res)=>{
        if(res.length >0)
        {
            
        let sethash = makeid(100)
        sendNewMail(EmpReqData.email_id,sethash)
        console.log("Found")
    db.query('UPDATE hash SET hash= ? WHERE email_id = ?', [sethash,EmpReqData.email_id],(err,res)=>{
        if(err)
        {
            console.log(err)
            result(null,{status:false, message:err})
        }
        else{
            console.log("Inserted succcessfully")
            result(null,{status:true,message:"Sent"})
        }
    })


        }
        else{
        result(null,{status:false, message:"User not found"})
    console.log("User not found")
    }})


}

module.exports = Users