const mysql = require('mysql')

// create database connection
const dbConnection = mysql.createPool({
    // host: "localhost",
    // user :"root",
    // password: "",
    // database:"enter"
    host: "lhcp3200.webapps.net",
    user :"mg53u0ou_enter",
    password: "fde.7ep$1$}+",
    database:"mg53u0ou_enterapp"
})

// calling to connect
function connection(){
dbConnection.getConnection(function(error){
    if(error) throw error
    console.log("database connected succesfully")
})
dbConnection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      connection();                         
    } else {                                      
        connection();                                 
    }
  });
}
connection()
module.exports = dbConnection