// import database
var db = require('../../database/database')
var nodemailer = require('nodemailer');

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
    this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

}
const sendNewMail=(email,seats,name,venue,date)=>{
    console.log(email,seats,name,venue,date)

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
    
    let mailOptions = {
       from: process.env.EMAIL,
       to: email,
       subject: 'New Booking Request',
       html : `<div>
       <h1>B-Enter got new booking request for you</h1>
       <p>We're looking for ${seats} for the event <h3>${name}</h3>  DATED : ${date}</p>
         <p>Please reply this email to approve or reject the request</p>
        <button onclick="{console.log('I am pressed')}">Press me</button>
    </div>`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           return console.log(error.message);
       }
       console.log('success');
    });
    
 }
 
//Get booking model
booking.getResult = (result) => {
    db.query('SELECT * from booking', (err, res) => {
        if (err) {
            console.log('error while fetching', err)
            result(null, err)
        }
        else {
            console.log('fetched successfully', res)
            result(null, res)
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
            console.log("selected by ID")
            result(null, res)
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
            console.log("selected by ID")
            result(null, res)
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
                                    sendNewMail(resp[0].contact_email , EmpReqData.seats,resp[0].title,EmpReqData.venue,EmpReqData.date)
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
module.exports = booking