// import database
var db = require('../../database/database')
//create model/schema for table
var booking = function(booking) {



id	 =  booking.id;
event_id	    =  booking.event_id;
user_id	        =  booking.user_id;
user_name	    =  booking.user_name;
seats	        =  booking.seats;
price_per_seat	    =  booking.price_per_seat;
total_price	    =  booking.total_price;
date	        =  booking.date;
time_in	        =  booking.time_in;
time_out	    =  booking.time_out;
status	        =  booking.status;
created_at	    =  new Date().toISOString().slice(0, 19).replace('T', ' ');
updated_at  =  new Date().toISOString().slice(0, 19).replace('T', ' ');
    
}   

//Get booking model
booking.getResult = (result) => {
    db.query('SELECT * from booking', (err,res)=>{
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

//Get booking by ID model
booking.getbookingByID=(id,result)=>{
    db.query('SELECT * from booking WHERE id=?',id,(err,res)=>{
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

booking.getbookingByCatID=(id,result)=>{
    db.query('SELECT * from booking WHERE category=?',id,(err,res)=>{
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
booking.createbooking=(EmpReqData, result)=>{
    db.query('INSERT into booking SET ?', EmpReqData,(err,res)=>{
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
booking.updatebooking=(id,data,result)=>{

    db.query('UPDATE booking SET status=?, updated_at = ? WHERE    id=?',
    [
data.status, data.updated_at

, id    ],(err,res)=>{
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
booking.updateAccount=(id,data,result)=>{

    db.query('UPDATE booking SET has_account = 1 WHERE email=?',
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
booking.deletebooking = (id,result)=>{
    db.query('DELETE FROM booking WHERE id=?',[id],(err,res)=>{
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
module.exports = booking