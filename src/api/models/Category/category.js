
// import database
var db = require('../../database/database')
//create model/schema for table
var category = function(category) {


this.id = category.id;
this.name = category.name;
this.main_image = category.main_image;
this.colorcode = category.colorcode


}   

//Get category model
category.getResult = (result) => {
    db.query('SELECT * from category', (err,res)=>{
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

//Get category by ID model
category.getcategoryByID=(id,result)=>{
    db.query('SELECT * from category WHERE id=?',id,(err,res)=>{
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
category.createcategory=(EmpReqData, result)=>{
    db.query('INSERT into category SET ?', EmpReqData,(err,res)=>{
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
category.updatecategory=(id,data,result)=>{

    db.query('UPDATE category SET name = ? , main_image =? WHERE id=?',
    [data.name,data.main_image,id],(err,res)=>{
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
category.deletecategory = (id,result)=>{
    db.query('DELETE FROM category WHERE id=?',[id],(err,res)=>{
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
module.exports = category