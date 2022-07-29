// import database
var db = require('../../database/database')
var nodemailer = require('nodemailer');
const crypto = require('crypto');
// const { v3: uuidv3 } = require('uuid');
// console.log(uuid.v3())
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
let hash = makeid(100);
//create model/schema for table
var booking = function (booking) {



    this.id = booking.id;
    this.order_no = booking.order_no;
    this.event_id = booking.event_id;
    this.category = booking.category;
    this.user_id = booking.user_id;
    this.user_name = booking.user_name;
    this.seats = booking.seats;
    this.price_per_seat = booking.price_per_seat;
    this.total_price = booking.total_price;
    this.date = booking.date;
    this.time_in = booking.time_in;
    this.time_out = booking.time_out;
    this.status = booking.status;
    this.hash = hash;
    this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

}
const sendNewMail = (id, email, seats, name, venue, date) => {
    console.log(email, seats, name, venue, date)

    let transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 465,
        secure: true,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let mailOptions
    if (id == 2) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Booking Update request',
            html: `<div>
       <h1>B-Enter got new booking request for you</h1>
       <p>We're looking for ${seats} for the event <h3>${name}</h3>  DATED : ${date}</p>
         <p>Please reply this email to approve or reject the request</p>
         <button><a href=${`http://localhost:3000/${hash}`} target="_blank" >Accept</a></button>
    </div>`
        }
    }
    else if (id == 1) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Update Booking Request',
            html: `<div>
       <h1>B-Enter got update in booking request for you</h1>
       <p>We're looking for ${seats} for the event <h3>${name}</h3>  DATED : ${date}</p>
         <p>Please reply this email to approve or reject the request</p>
         <button><a href=${`http://localhost:3000/${hash}`} target="_blank" >Accept</a></button>
    </div>`
        };
    }
    else if (id == 3) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Booking Request Update',
            html: `<div>
       <h1>Your Booking request has been Rejected</h1>
       <p>Your booking for ${seats} no of seats for the event under order no: <h3>${name}</h3>  DATED : ${date}</p>
       <p>has been rejected.</p>
    </div>`
        }


    }
    else if (id == 4) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Booking Request Update',
            html: `<div>
   <h1>Your Booking request has been Approved</h1>
   <p>Your booking for ${seats} no of seats for the event under order no: <h3>${name}</h3>  DATED : ${date}</p>
   <p>has been approved.</p>
</div>`
        }
    }
    else if (id == 5) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Booking Request Update',
            html: `<div>
   <h1>You have Accepted the Booking request for ${name} </h1>
   <p>This is to inform you that you have successfully accepted the booking for  event ${name} with ${venue} no of seats under order no: <h3>${seats}</h3>  DATED : ${date}</p>
   
</div>`
        }
    }
    else if (id == 6) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Booking Request Update',
            html: `<div>
   <h1>You have Rejected the Booking request for ${name} </h1>
   <p>This is to inform you that you have successfully rejected the booking for  event ${name} with ${venue} no of seats under order no: <h3>${seats}</h3>  DATED : ${date}</p>
   
</div>`
        }
    }
    if (id == 7) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Time Change Request',
            html: `<div>
   <h1>You have received the change time request </h1>
   <p>Please review the change time request for event <strong>${seats}</strong> under order no: <h3>${name}</h3>  New Recommended time :
   Check-In: ${venue}  Check-Out:${date}</p>
   <p>Please check your time request from your app and accept or reject acordingly</p>
   
</div>`
        }
    }



    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("errir", error.message);
        }
        console.log('success');
    });
}





// id,order_no,event_id,user_id,category,user_name,seats,price_per_seat,total_price,date,time_in,time_out,status,created_at,updated_at
//Get booking model
booking.getResult = (result) => {
    db.query('SELECT * from booking', (err, res) => {
        if (err) {
            console.log('error while fetching', err)
            result(null, err)
        }
        else {
            console.log("ID", res[0].event_id)
            db.query('SELECT * from events ', (err, resp) => {
                if (err) {
                    console.log('error while fetching', err)
                    result(null, err)
                }
                else {
                    console.log('selected')
                    result(null, res, resp)
                }
            })
        }
    })
}

//Get booking by ID model
booking.getbookingByID = (id, result) => {
    db.query('SELECT * from booking WHERE id=?', id, (err, res) => {
        if (err) {
            console.log("error while fetching")
            result(null, err)

        }
        else {
            if (res.length > 0) {
                db.query('SELECT * from events WHERE id = ? ', res[0].event_id, (err, resp) => {
                    if (err) {
                        console.log('error while fetching', err)
                        result(null, err)
                    }
                    else {
                        console.log('selected')
                        result(null, res, resp)
                    }
                })
            }
            else {
                result(null, null)
            }
        }
    })
}

booking.getbookingByCatID = (id, result) => {
    db.query('SELECT * from booking WHERE  user_id = ?', id, (err, res) => {
        if (err) {
            console.log("error while fetching")
            result(null, err)

        }
        else {

            if (res.length > 0) {
                db.query('SELECT * from events  ', (err, resp) => {
                    if (err) {
                        console.log('error while fetching', err)
                        result(null, err)
                    }
                    else {
                        console.log('selected')
                        result(null, res, resp)
                    }
                })
            }
            else {
                result(null, null)
            }
        }
    })
}

//Create model
booking.createbooking = (EmpReqData, result) => {
    db.query('INSERT INTO booking SET ?', EmpReqData, (err, res) => {
        if (err) {
            console.log(err)
            result(null, { status: false, message: err })
        }

        else {
            db.query('SELECT * from events WHERE id=?', [EmpReqData.event_id], (err, resp) => {
                if (err) {
                    console.log(err)
                    result(null, { status: false, message: err })
                }
                else {
                    console.log(resp[0].capacity - EmpReqData.seats)
                    let seats = resp[0].capacity - EmpReqData.seats

                    db.query(`UPDATE events SET capacity=?, updated_at = ? WHERE    id=?`,
                        [
                            seats, new Date().toISOString().slice(0, 19).replace('T', ' ')

                            , EmpReqData.event_id], (err, res) => {
                                if (err) {
                                    console.log(err)
                                    result(null, err)
                                }
                                else {
                                    console.log("success")
                                    sendNewMail(resp[0].contact_email, EmpReqData.seats, resp[0].title, EmpReqData.venue, EmpReqData.date)
                                    result(null, { status: true, message: "Event was Successfully booked", id: res.id })
                                }
                            })


                }
            })
        }
    })


}

//Update Model
booking.updatebooking = (id, data, result) => {

    db.query('UPDATE booking SET status=?, updated_at = ? WHERE    id=?',
        [
            data.status, data.updated_at

            , id], (err, res) => {
                if (err) {
                    console.log(err)
                    result(null, err)
                }
                else {
                    console.log("success")
                    result(null, { status: true, message: "UPDATED", id: res.id })
                }
            })

}
//Update User Booking Model
booking.updateUserbooking = (id, data, result) => {
    db.query("SELECT * from booking WHERE id=?", id, (err, res) => {
        if (err) {
            console.log(err)
            result(null, err)
        }
        else {
            db.query("SELECT email from user WHERE id=?", res[0].user_id, (err, resp) => {
                if (err) {
                    console.log(err)
                    result(null, err)
                }
                else {
                    db.query('UPDATE booking SET seats=?, updated_at = ? WHERE    id=?',
                        [
                            data.seats, data.updated_at

                            , id], (err, response) => {
                                if (err) {
                                    console.log(err)
                                    result(null, err)
                                }
                                else {
                                    console.log("success")
                                    console.log("resp", resp[0].email)
                                    console.log("res", res)
                                    sendNewMail(1, resp[0].email, data.seats, "", "", "")
                                    db.query('SELECT * from events WHERE id=?', [res[0].event_id], (err, response) => {
                                        if (err) {
                                            console.log(err)
                                            result(null, err)
                                        }
                                        else {
                                            sendNewMail(2, response[0].contact_email, data.seats, response[0].title, response[0].venue, response[0].date)
                                            result(null, { status: true, message: "Booking has been updated successfully", id: response.id })
                                        }
                                    })
                                }
                            })
                }

            })
        }
    })


}

//Confirm booking
booking.confirmbooking = (id, data, result) => {

    db.query("SELECT * from booking where id = ?", id, (err, res) => {
        if (err) {
            console.log(err)
            result(null, err)
        }
        else {
            db.query("SELECT email from user WHERE id=?", res[0].user_id, (err, resp) => {
                if (err) {
                    console.log(err)
                    result(null, err)
                }
                else {
                    db.query('UPDATE booking SET status=?, updated_at = ? WHERE    id=?',
                        [
                            data.status, data.updated_at

                            , id], (err, response) => {
                                if (err) {
                                    console.log(err)
                                    result(null, err)
                                }
                                else {
                                    console.log("success")
                                    console.log("resp", resp[0].email)
                                    console.log("res", res)
                                    if (data.status == 1) {
                                        sendNewMail(4, resp[0].email, res[0].seats, res[0].order_no, res[0].venue, res[0].date)
                                    }
                                    else if (data.status == 2) {
                                        sendNewMail(3, resp[0].email, res[0].seats, res[0].order_no, res[0].venue, res[0].date)
                                    }
                                    db.query('SELECT * from events WHERE id=?', [res[0].event_id], (err, response) => {
                                        if (err) {
                                            console.log(err)
                                            result(null, err)
                                        }
                                        else {
                                            if (data.status == 1) {
                                                sendNewMail(5, response[0].contact_email, res[0].order_no, response[0].title, res[0].seats, response[0].date)
                                                result(null, { status: true, message: "Booking has been updated successfully", id: response.id })
                                            }
                                            else if (data.status == 2) {
                                                sendNewMail(6, response[0].contact_email, res[0].order_no, response[0].title, res[0].seats, response[0].date)
                                                result(null, { status: true, message: "Booking has been updated successfully", id: response.id })
                                            }
                                        }
                                    })
                                }
                            })
                }

            })
        }
    })
    // db.query('UPDATE booking SET status=?, updated_at = ? WHERE    id=?',
    //     [
    //         data.status, new Date().toISOString().slice(0, 19).replace('T', ' ')

    //         , id], (err, res) => {
    //             if (err) {
    //                 console.log(err)
    //                 result(null, err)
    //             }
    //             else {
    //                 console.log("success")
    //                 if(data.status===1){
    //                     sendNewMail(3, res[0].contact_email, res[0].seats, res[0].title, res[0].venue, res[0].date)
    //                 }
    //                 result(null, { status: true, message: "UPDATED", id: res.id })
    //             }
    //         })

}
booking.updateAccount = (id, data, result) => {

    db.query('UPDATE booking SET has_account = 1 WHERE email=?',
        [id], (err, res) => {
            if (err) {
                console.log(err)
                result(null, err)
            }
            else {
                console.log("success")
                result(null, { status: true, message: "UPDATED", id: res.id })
            }
        })

}

//Delete model
booking.deletebooking = (id, result) => {
    db.query('DELETE FROM booking WHERE id=?', [id], (err, res) => {
        if (err) {
            console.log("Unable to delete")
            result(null, err)
        }
        else {
            console.log("Deleted successfully")
            result(null, res)
        }
    })
}

booking.changeTimeRequest = (id, data, result) => {
    db.query('SELECT * FROM booking where id = ?', id, (err, res) => {
        if (err) {
            console.log(err)
            result(null, err)
        }
        else {
            db.query('SELECT email from user where id = ?', res[0].user_id, (err, resp) => {
                if (err) {
                    console.log(err)
                    result(null, err)
                }
                else {
                    console.log("Buyer", resp[0].email)
                    db.query("SELECT * from events WHERE id=?", res[0].event_id, (err, response) => {
                        if (err) {
                            console.log(err)
                            result(null, err)
                        }
                        else {
                            console.log("Seller", response[0].contact_email)
                            db.query("UPDATE booking set status = 0 , time_in =? , time_out=? WHERE id = ?", [data.time_in, data.time_out, id], (err, rest) => {
                                if (err) {
                                    console.log(err)
                                    result(null, err)
                                }
                                else {
                                    //    console.log("seats", response)
                                    sendNewMail(7, resp[0].email, response[0].title, res[0].order_no, data.time_in, data.time_out)
                                    result(null, { status: true, message: "Booking has been updated successfully", id: rest.id })
                                }
                            })
                        }
                    })
                }
            })
        }

    })
}
module.exports = booking