
// import database
var db = require('../../database/database')
//create model/schema for table
var Devices = function(Devices) {


this.id = Devices.id;
this.user_id = Devices.user_id;
this.device_id = Devices.device_id;


}   

//Get Devices model
Devices.getResult = (result) => {
    db.query('SELECT * from pushnotifications', (err,res)=>{
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

//Get Devices by ID model
Devices.getDevicesByID=(id,result)=>{
    db.query('SELECT * from pushnotifications WHERE id=?',id,(err,res)=>{
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


//Create model
Devices.createDevices=(EmpReqData, result)=>{
    db.query('SELECT device_id from pushnotifications where device_id = ?',EmpReqData.device_id,(err,res)=>{
        if(err)
        {
            console.log(err)
            result(null,{status:false, message:err})
        }
        else if(res.length>0){
            result(null,{status:false, message:"Already registered"})
        }
        else{
            db.query('INSERT into pushnotifications SET ?', EmpReqData,(err,res)=>{
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
    })
    

}

//Update Model
Devices.updateDevices=(id,data,result)=>{

    db.query('UPDATE pushnotifications SET name = ? WHERE id=?',
    [data.name,id],(err,res)=>{
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
Devices.deleteDevices = (id,result)=>{
    db.query('DELETE FROM pushnotifications WHERE device_id=?',[id],(err,res)=>{
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
module.exports = Devices