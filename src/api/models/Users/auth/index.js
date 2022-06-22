
// import database
var db = require('../../../database/database')
const bcrypt = require ("bcrypt")
const { sign } = require("jsonwebtoken");

//create model/schema for table
var Users = function(users) {
this.id = users.id;
this.email = users.email;
this.user_name = users.user_name;
this.password   = users.password;
this.phone =  users.phone;
this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ')


}   




//Create model
Users.createUsers=(EmpReqData, result)=>{
    console.log(EmpReqData.email)
    const saltrounds =  10
    const fun = async () =>{
        const hashpassword =  await bcrypt.hash(EmpReqData.password, saltrounds)
    console.log("hased",hashpassword)
    EmpReqData.password = hashpassword
    console.log("emp", EmpReqData.password)

    }
    fun()
    setTimeout(rest,3000)
    
   function rest(){
    db.query('SELECT * FROM user where email = ?', EmpReqData.email,(err,res)=>{
        if(res.length>0)
        {
            console.log(res.password)
            result(null,{status:false, message:"User Already registered"})
        }
        else{
            db.query('INSERT into user SET ?', EmpReqData,(err,res)=>{
                if(err){
                    console.log(err)
                    result(null,{status:false, message:"Something went wrong"})
                }
                else{
                    db.query("INSERT into hash SET email_id=? , hash=''",EmpReqData.email,(err,res)=>{
                        if(err){
                            console.log(err)
                            result(null,{status:false, message:"Unable to set hash for the user"})
                        }
                        else{
                            console.log(res.password)
                    console.log("Inserted succcessfully")
            result(null,{status:true,message:"User created"})
                        }
                    })
                    
                }
            })
        }
    })
   }
  
}

//Change password 
Users.updateUsers=(id,data,result)=>{
    const saltrounds =  10
    const fun = async () =>{
        const hashpassword =  await bcrypt.hash(data.password, saltrounds)
    console.log("hased",hashpassword)
    data.password = hashpassword
    console.log("emp", data.password)

    }
    fun()
    setTimeout(rest,3000)
    function rest(){
        db.query('UPDATE user SET password=? WHERE email=?',
    [data.password,id],(err,res)=>{
        if(err)
        {
            console.log(err)
            result(null,err)
        }
        else
        {
            db.query("UPDATE hash SET hash='' WHERE email_id=?",
    [id],(err,res)=>{
        if(err)
        {
            console.log(err)
            result(null,err)
        }
        else
        {
            console.log("Updated succcessfully")
            result(null,{status:true,message:"Password changed"})
        }

    })
            console.log("success")
        }
    })
    }

}

Users.loginUsers = (EmpReqData, result) => {
   let a = db.query('SELECT * FROM user where email = ?', EmpReqData.email,(err,results,res)=>{
        if(results.length>0){
            let validate
            const validation= async ()=>{
                validate = await bcrypt.compare(EmpReqData.password, results[0].password)
                if(validate)
                {
                    EmpReqData.password = undefined;
                    const jsontoken = sign({ result: EmpReqData }, process.env.JWT_SECRET_KEY, {
                      expiresIn: "1h"
                    })
                    result(null,{status:true,message:"Logged in",token:jsontoken , id :results[0].id})
                }else{
                console.log(results[0].password, EmpReqData.password)
                result(null,{status:false,message:"Incorrect password"})
    }
            }
            validation()
           
        }  else{
            
            console.log("here",results.length)
            result(null,{status:false, message:"User not found"})
        }
    })
}

Users.loginAgents = (EmpReqData, result) => {
    let a = db.query('SELECT * FROM agents where email = ?', EmpReqData.email,(err,results,res)=>{
         if(results.length>0){
             let validate
             const validation= async ()=>{
                 validate = await bcrypt.compare(EmpReqData.password, results[0].password)
                 if(validate)
                 {
                     EmpReqData.password = undefined;
                     const jsontoken = sign({ result: EmpReqData }, process.env.JWT_SECRET_KEY, {
                       expiresIn: "1h"
                     })
                     result(null,{status:true,message:"Logged in",token:jsontoken , id :results[0].id})
                 }else{
                 console.log(results[0].password, EmpReqData.password)
                 result(null,{status:false,message:"Incorrect password"})
     }
             }
             validation()
            
         }  else{
             
             console.log("here",results.length)
             result(null,{status:false, message:"User not found"})
         }
     })
 }
module.exports = Users