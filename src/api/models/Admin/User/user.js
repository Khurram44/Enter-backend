
// import database
var db = require('../../../database/database')
//create model/schema for table
const bcrypt = require ("bcrypt")
var Agents = function(Agents) {


this.id = Agents.id;	
this.username	    = Agents.username;
this.email	        = Agents.email;
this.password	    = Agents.password;
this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')


}   

//Get Agents model
Agents.getResult = (result) => {
    db.query('SELECT * from agents', (err,res)=>{
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




//Create model
Agents.createAgents=(EmpReqData, result)=>{
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
    db.query('SELECT * FROM agents where email = ?', EmpReqData.email,(err,res)=>{
        if(res.length>0)
        {
            console.log(res.password)
            result(null,{status:false, message:"User Already registered"})
        }
        else{
            db.query('INSERT into agents SET ?', EmpReqData,(err,res)=>{
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

//Update Model
Agents.updateAgents=(id,data,result)=>{

    db.query('UPDATE agents SET is_verified = 1 WHERE email=?',
    [id],(err,res)=>{
        if(err)
        {
            console.log(err)
            result(null,err)
        }
        else
        {
            console.log("success")
            result(null,{status:true,message:"UPDATED",id:res.id})
        }
    })

}

//Delete model
Agents.deleteAgents = (id,result)=>{
    db.query('DELETE FROM agents WHERE id=?',[id],(err,res)=>{
        if(err)
        {
            console.log("Unable to delete")
            result(null,err)
        }
        else
        {
            console.log("Deleted successfully")
           result(null,res)
        }
    })
}
module.exports = Agents