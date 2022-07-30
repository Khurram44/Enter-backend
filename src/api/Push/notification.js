var FCM = require('fcm-node');
var serverKey = 'AAAAbbVDugY:APA91bFPKiho7adO0u-o439h-bWiqSgA12tZSN-WyktKTfhn6vgJOMogDYgUl-0aqKxOwzY0fLMMXoDNv6x2WbVwDYk83ZMWiAVXt0IAede2CdBcroEc5YRh0TLZG_6qwbVbCZ9Ql-cz'; //put your server key here
var fcm = new FCM(serverKey);

var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: '0BRn6UCZp-QlZS-gkRovqi', 
    collapse_key: 'your_collapse_key',
    
    notification: {
        title: 'Title of your push notification', 
        body: 'Body of your push notification' 
    },
    
    data: {  //you can send only notification or only data(or include both)
        my_key: 'my value',
        my_another_key: 'my another value'
    }
};

fcm.send(message, function(err, response){
    if (err) {
        console.log("Something has gone wrong!");
    } else {
        console.log("Successfully sent with response: ", response);
    }
});