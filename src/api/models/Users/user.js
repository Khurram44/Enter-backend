
// import database
var db = require('../../database/database')
//create model/schema for table
var Users = function(users) {

this.id = users.id;
this.user_name = users.user_name;
this.email  = users.email;
this.password = users.password;
this.is_verified = users.is_verified
this.has_account = users.has_account
this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ')


}   

//Get users model
Users.getResult = (result) => {
    db.query('SELECT * from user', (err,res)=>{
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

//Get users by ID model
Users.getUsersByID=(id,result)=>{
    db.query('SELECT * from user WHERE email=?',id,(err,res)=>{
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
Users.createUsers=(EmpReqData, result)=>{
    db.query('INSERT into user SET ?', EmpReqData,(err,res)=>{
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
Users.updateUsers=(id,data,result)=>{

    db.query('UPDATE user SET is_verified = 1 WHERE email=?',
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
Users.updateAccount=(id,data,result)=>{

    db.query('UPDATE user SET has_account = 1 WHERE email=?',
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

// Suspend Account
Users.updateSuspend=(id,data,result)=>{

    db.query('UPDATE user SET is_suspended = 1 , is_active = 1 WHERE id=?',
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

//Remove suspended account
Users.removeSuspend=(id,data,result)=>{

    db.query('UPDATE user SET is_suspended = 0 , is_active = 0 WHERE id=?',
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

//Delete Account
Users.updateDelete=(id,data,result)=>{

    db.query('UPDATE user SET is_deleted = 1 , is_active = 1 WHERE id=?',
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

//Restore account
Users.restoreDelete=(id,data,result)=>{

    db.query('UPDATE user SET is_deleted = 0 , is_active = 0 WHERE id=?',
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
Users.deleteUsers = (id,result)=>{
    db.query('DELETE FROM user WHERE id=?',[id],(err,res)=>{
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
module.exports = Users