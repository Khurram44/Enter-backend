const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const axios = require('axios')
const multer = require("multer");
const path = require("path");
const { Expo } = require('expo-server-sdk')
// create express app
const app = express()
app.use(cors())
app.use(express.json());
//setting up server port
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// define root routers
app.get('/api/cmc/market', async (req,res)=>{
    const response = await axios.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=ARV',{
        headers: {
          'Access-Control-Allow-Origin': '',
          'Content-Type': 'application/json',
          'X-CMC_PRO_API_KEY': 'a0b5279d-d417-423d-8d91-54729fe158b4',
          'Accept': '*/*'
        }
      })
    //   res.send(response.data)
    res.send(response.data)
})

app.get("/", (req, res) => {
    res.send({status:true, message:"System is responding"});
})
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

    
// import the required routes
const {checkToken} = require("./src/api/auth/token_validation")
const userRoutes = require('./src/api/routes/Users/user')
const authRoutes = require('./src/api/routes/Users/auth/index')
const userRouter = require('./src/api/routes/Users/otp/userRouter');
const resetRouter = require("./src/api/routes/Users/reset/password-reset")
const form = require('./src/api/routes/Form/index')
const categoryRoute =  require('./src/api/routes/Category/category')
const agentRoute = require('./src/api/routes/Admin/User/user')
const bookingRoute  = require("./src/api/routes/Booking/booking")
var nodemailer = require('nodemailer');
const push = require('./src/api/Push/router')
// function push(){
//   var FCM = require('fcm-node');
// var serverKey = 'AAAAbbVDugY:APA91bFPKiho7adO0u-o439h-bWiqSgA12tZSN-WyktKTfhn6vgJOMogDYgUl-0aqKxOwzY0fLMMXoDNv6x2WbVwDYk83ZMWiAVXt0IAede2CdBcroEc5YRh0TLZG_6qwbVbCZ9Ql-cz'; //put your server key here
// var fcm = new FCM(serverKey);

// var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
//     to: '0BRn6UCZp-QlZS-gkRovqi', 
//     collapse_key: 'your_collapse_key',
    
//     notification: {
//         title: 'Title of your push notification', 
//         body: 'Body of your push notification' 
//     },
    
//     data: {  //you can send only notification or only data(or include both)
//         my_key: 'my value',
//         my_another_key: 'my another value'
//     }
// };

// fcm.send(message, function(err, response){
//     if (err) {
//         console.log("Something has gone wrong!");
//     } else {
//         console.log("Successfully sent with response: ", response);
//     }
// });
// }

//Create routes



app.use('/users',  userRoutes)
app.use('/auth', authRoutes)
app.use('/api/user', userRouter);
app.use('/api/reset', resetRouter);
app.use('/api/events',form)
app.use('/api/category',categoryRoute)
app.use('/api/agent',agentRoute)
app.use('/api/booking',bookingRoute)
app.use('/api/push',push)
// app.use('/api/cmc/market',);




//Listening to the port


module.exports = app