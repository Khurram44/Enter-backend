const { default: axios } = require('axios')
var module = require('../../models/Form/index')

exports.getList = (req,res) =>{
   console.log("complete list here")
   module.getResult((err,emp,cat)=>{
       if(err)
       {
          res.send(err)
       }
       console.log(emp)
       let news = emp.map((e)=>{
       {   e.location={
               latitude:e.lat,
               longitude:e.lon
          }
          e.images=[{
               img1:e.img1,
               img2:e.img2,
               img3:e.img3,
               img4:e.img4,
               img5:e.img5

          }]
          e.categories= cat.filter(s=> s.id === e.category).map(r=> ({name:r.name , colorcode:r.colorcode}))
          delete e.lat 
          delete e.lon
            delete e.updated_at
            delete e.img1
            delete e.img2
            delete e.img3
            delete e.img4
            delete e.img5}
          return e
       })
       res.send(news)
   })
}

exports.getEventsByID= (req,res)=>{
   module.getEventsByID(req.params.id,(err,Events,cat)=>{
      if(err)
      {
         res.send(err)
      }
      else{
         console.log("Single Events data",Events)
         let news = Events.map((e)=>{
            e.location={
                 latitude:e.lat,
                 longitude:e.lon
            }
            e.categories = cat.map(r=> r.name)
            delete e.lat 
            delete e.lon
            delete e.created_by
            delete e.created_at
              delete e.updated_at
            return e
         })
         res.send(news)
      }

   })
}
const translations = {
   'days':'giorni',
   'day':'giorni',
   'hours': 'ore', 
   'hour': 'ore',   
   'mins': 'min', 
   'min': 'min',  
 };
 
 const translateDurationText = (durationText) => {
   return durationText.replace(/hours?|days?|mins?/g, match => translations[match]);
 };
const findMatrix = async (a,b,c,d) => {
   console.log(a,b,c,d)
   var config = {
     method: 'get',
     url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${a},${b}&destinations=${c},${d}&units=metric&key=AIzaSyCqDXws4tnwb5zmd4xjlg9dj8W_lhe0XLU`,
     headers: {}
   };
   try {
      const response = await axios.request(config)
      const elements = response.data.rows[0].elements;
  
      // Translate duration text
      elements.forEach(element => {
        if (element.duration && element.duration.text) {
          element.duration.text = translateDurationText(element.duration.text);
        }
      });
  
      console.log(elements);
      return elements;
    } catch (error) {
      console.error(error);
      return error.response.data;
    }
 }

exports.getEventsByCatID= (req,res)=>{
    module.getEventsByCatID(req.params.category,(err,Events,cat)=>{
       if(err)
       {
          res.send(err)
       }
       else{
         if(Events.status == false)
         {
           return res.send({status:false , data:[] , message:Events.message})
         }
          let news = 
          Events.map((e)=>{
            e.location={
               latitude:e.lat,
               longitude:e.lon
          }
          e.categories = cat.map(r=> ({name:r.name , colorode:r.colorcode}))
         //  console.log(f,"ff")

         

            delete e.lat 
            delete e.lon
            delete e.created_by
            delete e.created_at
              delete e.updated_at
            return e
         })
         res.send(news)
        }
 
    })
 }
 
 exports.getEventsByCatIDB= (req,res)=>{
   const body = new module(req.body)
   // console.log(body,"body")
    module.getEventsByCatID(req.params.category,async(err,Events,cat)=>{
       if(err)
       {
          res.send(err)
       }
       else{
         if(Events.status == false)
         {
         res.send([])
         }
         else
         {
            let news = 
            await Promise.all (  Events.map(async(e)=>{
              e.location={
                 latitude:e.lat,
                 longitude:e.lon
            }
            e.categories = cat.map(r=> ({name:r.name , colorode:r.colorcode}))
           //  console.log(f,"ff")
  
            let fff = await findMatrix(e.lat,e.lon,body.lat,body.lon).then(f=>{
         //   console.log(f)
           return f
             })
             e.distance=fff
            
  
              delete e.lat 
              delete e.lon
              delete e.created_by
              delete e.created_at
                delete e.updated_at
              return e
           }))
           res.send(Events)
     

         }
         }
 
    })
 }

exports.AddEvents=(req,res)=>{
   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.createEvents(data,(err,emp)=>{
         if(err)
         {
            res.send(err)
         }
         else{
            res.json({status:emp.status, message:"Success",data:emp.InsertId})
         }
      })
      console.log("valid data")
   }
}


// Update Events model
exports.UpdateEvents=(req,res)=>{

   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.updateEvents(req.params.id,data,(err,emp)=>{
         if(err)
         {
            res.send(err)
         }
         else{
            res.json({status:true, message:"Success",data:emp.InsertId})
         }
      })
      console.log("valid data")
   }

}
exports.updateImages =(req,res)=>{
   const body = new module(req.body)
   module.updateImages(req.params.id,body,(err,result)=>{
      if(err)
      {
         res.send(err)
      }
      else{
         res.send(result)
      }
   })
}


//Has Accounts
exports.updateAccount=(req,res)=>{

   const data = new module(req.body)   
   console.log("request data", req.body)

   if(req.body.constructor === Object && Object.keys(req.body).length===0)
   {
      res.send(400).send({success:false,message:"Please fill up all the fields"})
   }
   else{
      module.updateAccount(req.params.email,data,(err,emp)=>{
         if(err)
         {
            res.send(err)
         }
         else{
            res.json({status:true, message:"Success",data:emp.InsertId})
         }
      })
      console.log("valid data")
   }

}

// Delete Events

exports.deleteEvents = (req,res) =>{
   module.deleteEvents(req.params.id,(err,result)=>{
      if (err)
      {
         res.send(err)
      }
      else
      {
         res.json({status:true, message:"Deleted Successfully"})
      }

   })
}