
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
this.is_selectable = Events.is_selectable;
this.place	    = Events.place;
this.contact_email  = Events.contact_email;
this.flag = Events.flag;
this.img1 = Events.img1;
this.img2 = Events.img2;
this.img3 = Events.img3;
this.img4 = Events.img4;
this.img5 = Events.img5;
this.created_by	    = Events.created_by; 
this.created_at	    = new Date().toISOString().slice(0, 19).replace('T', ' ');
this.updated_at   = new Date().toISOString().slice(0, 19).replace('T', ' ');

}   

//Get Events model
Events.getResult = (result) => {
    db.query('SELECT * from events WHERE  DATE(date) >= curdate() OR date="0000-00-00" ', (err,res)=>{
        if(err){
            console.log('error while fetching', err)
            result(null,err)
        }
        else {
            db.query("SELECT * from category",(err,cat)=>{
                if(err){
                    console.log(err)
                }
                else{
                    result(null,res,cat)
                }
            })
            console.log('fetched successfully', res)
            // result(null,res)
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
            db.query("SELECT * from category WHERE id =?",res[0].category,(err,cat)=>{
                if(err){
                    console.log(err)
                }
                else{
                    result(null,res,cat)

                }
            })
            console.log("selected by ID")
        }
    })
}

Events.getEventsByCatID=(id,result)=>{
    db.query(`SELECT * FROM events WHERE ( DATE(date) >= curdate() OR date="0000-00-00") AND category=?`,id,(err,res)=>{
        if(err)
        {
            console.log("error while fetching")
            result(null,err)

        }
        else if(res.length <1)
        {
            result(null,{status:false , message:"No events are opened. Please check again in a while."})
            
        }
        else{
            db.query("SELECT * from category WHERE id =?",res[0].category,(err,cat)=>{
                if(err){
                    console.log(err)
                }
                else{
                    result(null,res,cat)

                }
            })
            console.log("selected by ID")
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

    db.query('UPDATE events SET title = ? , category = ? , subTitle = ? , venue = ? , address = ? , lat = ? , lon = ? , start = ? , end = ? , price = ? , date = ? , place = ? , flag = ?, contact_email=? , updated_at = ? WHERE    id=?',
    [
data.title , data.category , data.subTitle , data.venue , data.address , data.lat , data.lon , data.start , data.end , data.price , data.date , data.place , data.flag ,data.contact_email, new Date().toISOString().slice(0, 19).replace('T', ' ')

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

Events.updateImages = (id,data,result)=>{
    db.query('UPDATE events set img1 = ? ,img2 = ? , img3 = ? , img4 = ? , img5 = ? WHERE id  = ?',[data.img1 , data.img2 , data.img3 , data.img4 , data.img5 ,id],(err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            result(null,{status:true , message:"Image Updated"})
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