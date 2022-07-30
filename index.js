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


function push(){
// Create a new Expo SDK client
// optionally providing an access token if you have enabled push security
let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

// Create the messages that you want to send to clients
let messages = [];
let somePushTokens = ['ExponentPushToken[0BRn6UCZp-QlZS-gkRovqi]','ExponentPushToken[4ZHj00B1ty3AXEma-3CM7w]'];

for ( let pushToken of somePushTokens)
{
  // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

  // Check that all your push tokens appear to be valid Expo push tokens
  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    continue;
  }

  // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
  messages.push({
    to: pushToken,
    sound: 'default',
    body: 'This is a test notification',
    data: { withSome: 'data' },
  })
}

// The Expo push notification service accepts batches of notifications so
// that you don't need to send 1000 requests to send 1000 notifications. We
// recommend you batch your notifications to reduce the number of requests
// and to compress them (notifications with similar content will get
// compressed).
let chunks = expo.chunkPushNotifications(messages);
let tickets = [];
(async () => {
  // Send the chunks to the Expo push notification service. There are
  // different strategies you could use. A simple one is to send one chunk at a
  // time, which nicely spreads the load out over time:
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
      // NOTE: If a ticket contains an error code in ticket.details.error, you
      // must handle it appropriately. The error codes are listed in the Expo
      // documentation:
      // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
    } catch (error) {
      console.error(error);
    }
  }
})();
let receiptIds = [];
for (let ticket of tickets) {
  if (ticket.id) {
    receiptIds.push(ticket.id);
  }
}

let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
(async () => {
  for (let chunk of receiptIdChunks) {
    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log(receipts);
      for (let receiptId in receipts) {
        let { status, message, details } = receipts[receiptId];
        if (status === 'ok') {
          continue;
        } else if (status === 'error') {
          console.error(
            `There was an error sending a notification: ${message}`
          );
          if (details && details.error) {
            console.error(`The error code is ${details.error}`);
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
})();

}
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