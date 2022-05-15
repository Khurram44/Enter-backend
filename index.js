const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
const axios = require('axios')

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
    res.send("Hello World");
})

    
// import the required routes
// const {checkToken} = require("./src/api/auth/token_validation")
const userRoutes = require('./src/api/routes/Users/user')
const authRoutes = require('./src/api/routes/Users/auth/index')
const accounts = require("./src/api/routes/Users/accounts/accounts")
const userRouter = require('./src/api/routes/Users/otp/userRouter');
const resetRouter = require("./src/api/routes/Users/reset/password-reset")
//Create routes
app.use('/users',  userRoutes)
app.use('/auth', authRoutes)
app.use('/accounts', accounts)
app.use('/api/user', userRouter);
app.use('/api/reset', resetRouter);
// app.use('/api/cmc/market',);




//Listening to the port


module.exports = app