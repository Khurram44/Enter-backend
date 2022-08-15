const CryptoJS = require('crypto-js');
var module = require('./cypher')

//  const encrypt = (data , res) => {
    // return 
    // // CryptoJS.AES.encrypt(data, 'secret key 123').toString();
    // // var decryptedBytes = CryptoJS.AES.decrypt(data, "My Secret Passphrase");
    // // var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
    // res.send("plaintext")
// }

// module.exports = encrypt

exports.getCypher= (req,res)=>{

    // module.getCypher(req.params.id,(err,Feedback)=>{
    //    if(err)
    //    {
    //       res.send(err)
    //    }
    //    else{
    //       console.log("Single Feedback data",Feedback)
    //       res.send(Feedback)
    //    }
 
    // })
    var data = CryptoJS.AES.encrypt(req.params.id, 'My Secret Passphrase').toString();
    var decryptedBytes = CryptoJS.AES.decrypt(data, "My Secret Passphrase");
    var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8)
    console.log(plaintext)
    res.send(plaintext)
 }