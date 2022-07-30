var db = require('../database/database');
// var express = require('express');
var { Expo } = require('expo-server-sdk');
var booking = function (booking) {


this.message = booking.message;

}
booking.SendNotification =  (id, data, result) => {
    db.query("SELECT user_id FROM booking WHERE id = ?", [id], (err, resp) => {
        if(err) {
            console.log(err)
        }
        else {
            console.log(resp[0].user_id)
            db.query('SELECT device_id from pushnotifications WHERE user_id=?', resp[0].user_id, (err, res) => {
                if (err) {
                    result(err, null);
                }
                else {
                    result(null, res);
                    console.log(res);
               
            
            console.log("SendNotification",data.message);
        
                // Create a new Expo SDK client
                // optionally providing an access token if you have enabled push security
                let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
                
                // Create the messages that you want to send to clients
                let messages = [];
                let tkk = []
                for (let i = 0; i < res.length; i++) {
                    tkk.push(res[i].device_id)
                }
                console.log("TKKK",tkk)
                
                for ( let pushToken of tkk)
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
                    body: data.message,
                    data: { withSome: 'data' },
                  })
                }
                
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
            })
        }
    })
           
}

module.exports = booking