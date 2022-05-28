
// import database
var db = require('../../database/database')
//create model/schema for table
var Events = function(Events) {


this.id = Events.id;
this.title	    = Events.title;
this.category	    = Events.category;
this.subTitle	    = Events.subTitle;
this.venue	    = Events.venue;
this.address	        = Events.address;
this.lat	    = Events.lat;    //latitude
this.lon	    = Events.lon;    //longitude
this.start	    = Events.start;
this.end    = Events.end;
this.price	    = Events.price;
this.date	    = Events.date;
this.place	    = Events.place;
this.created_by	    = Events.created_by; 
this.created_at	    = new Date().toISOString().slice(0, 19).replace('T', ' ');
this.updated_at   = new Date().toISOString().slice(0, 19).replace('T', ' ');


}   

//Get Events model
Events.getResult = (result) => {
    db.query('SELECT * from events', (err,res)=>{
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

//Get Events by ID model
Events.getEventsByID=(id,result)=>{
    db.query('SELECT * from events WHERE id=?',id,(err,res)=>{
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

Events.getEventsByCatID=(id,result)=>{
    db.query('SELECT * from events WHERE category=?',id,(err,res)=>{
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
Events.createEvents=(EmpReqData, result)=>{
    db.query('INSERT into events SET ?', EmpReqData,(err,res)=>{
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
Events.updateEvents=(id,data,result)=>{

    db.query('UPDATE events SET is_verified = 1 WHERE email=?',
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
Events.updateAccount=(id,data,result)=>{

    db.query('UPDATE events SET has_account = 1 WHERE email=?',
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
Events.deleteEvents = (id,result)=>{
    db.query('DELETE FROM events WHERE id=?',[id],(err,res)=>{
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
module.exports = Events