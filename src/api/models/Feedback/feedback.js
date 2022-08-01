
// import database
var db = require('../../database/database')
//create model/schema for table
var Feedback = function(Feedback) {


this.id = Feedback.id;
this.user_id = Feedback.user_id;
this.feedback = Feedback.feedback;
this.is_active = Feedback.is_active;
this.created_at =new Date().toISOString().slice(0, 19).replace('T', ' ');


}   

//Get Feedback model
Feedback.getResult = (result) => {
    db.query('SELECT * from feedback', (err,res)=>{
        if(err){
            console.log('error while fetching', err)
            result(null,err)
        }
        else {
            db.query('SELECT * from user', (err,resp)=>{
                if(err){
                    console.log('error while fetching', err)
                    result(null,err)
                }
                else {
                    console.log('fetched successfully', res)
                    result(null,res,resp)
                }
            })
        }
    })
}

//Get Feedback by ID model
Feedback.getFeedbackByID=(id,result)=>{
    db.query('SELECT * from feedback WHERE id=?',id,(err,res)=>{
        if(err)
        {
            console.log("error while fetching")
            result(null,err)

        }
        else{
            db.query('SELECT * from user', (err,resp)=>{})
        }
    })
}


//Create model
Feedback.createFeedback=(EmpReqData, result)=>{
    db.query('INSERT into feedback SET ?', EmpReqData,(err,res)=>{
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
Feedback.updateFeedback=(id,data,result)=>{

    db.query('UPDATE feedback SET is_active = ? WHERE id=?',
    [data.is_active,id],(err,res)=>{
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
Feedback.deleteFeedback = (id,result)=>{
    db.query('DELETE FROM feedback WHERE id=?',[id],(err,res)=>{
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
module.exports = Feedback