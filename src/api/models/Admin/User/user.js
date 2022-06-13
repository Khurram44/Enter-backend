
// import database
var db = require('../../../database/database')
//create model/schema for table
var Agents = function(Agents) {


this.id = Agents.id;	
this.agentsname	    = Agents.agentsname;
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
    db.query('INSERT into agents SET ?', EmpReqData,(err,res)=>{
        if(err)
        {
            console.log(err)
            result(null,{status:false, message:err})
        }
        else{
            console.log("Inserted succcessfully")
            result(null,{status:true,message:"Success"})
        }
    })

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