// import database
var db = require('../../database/database')
var nodemailer = require('nodemailer');
const crypto = require('crypto');
var CryptoJS = require("crypto-js");
const { SendNotification } = require('../../Push/notification');
// const { v3: uuidv3 } = require('uuid');
// console.log(uuid.v3())
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabc.defghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
let hash = makeid(150);
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
    this.msg = booking.msg

}
const sendNewMail = (id, email, seats, name, venue, date, user) => {
    console.log(id, email, seats, name, venue, date, user, "id")
    console.log(date,"dat")
    var encryptedAES
    if (user === "") {
    }
    else {
        var users = venue.toString();
        encryptedAES = CryptoJS.AES.encrypt(users, "My Secret Passphrase");

    }

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
        // id, email, seats, name, venue, date, user
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'richiesta di Aggiornamento prenotazione',
            html: `<div>
           <h1>Richiesta per la prenotazione numero ${venue.order_no} aggiornata</h1>
           <p>Stiamo cercando ${seats} posti per l'evento <h3>${name}</h3> Ora : ${user}  Data ${venue.date}</p>
           <p>prenotazione numero : ${venue.order_no}</p>
           <p>Per favore rispondi a questa mail per approvare o rifiutare la richiesta</p>
           
         <button><a href=${`http://enterworld.it/options.html?Id=${hash}&&button=Accept&&Auth=${encryptedAES.toString().replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l')}`} target="_blank" >Accetta</a></button>
         <button><a href=${`https://enterworld.it/options.html?Id=${hash}&&button=Reject&&Auth=${encryptedAES.toString().replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l')}`} target="_blank" >Rifiuta</a></button>

    </div>`
        }
    }
    else if (id == 1) {
        mailOptions = {

            from: process.env.EMAIL,
            to: email,
            subject: 'Richiesta di aggiornamento prenotazione',
            html: `<div>
            <h1>La richiesta di aggiornamento per B-Enter è stata creata.</h1>
            <p> Questa mail è per informarti che l'aggiornamento di prenotazione per l'evento <strong>${name}</strong> è stato ricevuto. Ti aggiorneremo quando la tua richiesta verrà accettata.
            </p>
            <h2>Descrizione</h2>
            <h3>Nome prenotazione: ${name}</h3>
            <h3>Ora : ${date}</h3>
            <h3>Posti : ${seats}</h3>
    </div>`
        };
    }
    else if (id == 3) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Aggiornamento richiesta prenotazione',
            html: `<div>
            <h1>La tua richiesta di prenotazione è stata accettata</h1>
            <p>La tua prenotazione per ${seats} posti per l'evento con prenotazione numero: <h3>${name}</h3> in data : ${date}</p>
            <p>è stata accettata.</p>
            </div>`
          
        }


    }
    else if (id == 4) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Aggiornamento richiesta prenotazione',
            html: `<div>
            <h1>La tua richiesta di prenotazione è stata accettata</h1>
            <p>La tua prenotazione per ${seats} posti per l'evento con prenotazione numero: <h3>${name}</h3> in data : ${date}</p>
            <p>è stata accettata.</p>
</div>`
        }
    }
    else if (id == 5) {
        console.log(date,"id 5")
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Aggiornamento richiesta prenotazione',
            html: `<div>
            <h1>Hai accettato la richiesta di prenotazione per ${name} </h1>
            <p>Questa mail è per informarti che hai accettato con successo la prenotazione per l'evento ${name} con ${venue} posti per la prenotazione numero: <h3>${seats}</h3> in data : ${date}</p>
            </div>`
           
        }
    }
    else if (id == 6) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Aggiornamento richiesta prenotazione',
            html: `<div>
            <h1>Hai rifiutato la richiesta di prenotazion per ${name} </h1>
            <p>Questa mail è per informati che hai rifiutato la prenotazione per l'evento ${name} con ${venue} posti per la prenotazione numero: <h3>${seats}</h3> in data : ${date}</p>
            </div>`
        }
    }
    if (id == 7) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Richiesta cambio orario',
            html: `<div>
            <h1>Hai ricevuto una richiesta di cambio orario </h1>
            <p>Per favore controlla la richiesta di cambio orario per l'evento <strong>${seats}</strong> per la prenotazione numero: <h3>${name}</h3> Nuovo orario indicato :
            Registrare: ${venue} Guardare:${date}</p>
            <p>Per favore controlla la richiesta di orario dalla tua app ed accetta o rifiuta </p>
            </div>`
        }
    }
    else if (id == 8) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Aggiornamento sulla richiesta di cambio orario',
            html: `<div>
            <h1>Hai accettao la richiesta di cambio orario </h1>
            <p>Questa mail è per informarti che hai accettato la richiesta per l'evento<strong>${seats}</strong> pe la prenotazione numero: <h3>${name}</h3> Time-Slots :
            Registrare: ${venue} Guardare:${date}</p>
            <p>Il Team B-Enter</p>
            </div>`
        }
    }
    else if (id == 9) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Aggiornamento sulla richiesta di cambio orario',
            html: `<div>
            <h1>La tua richiesta di cambio orario è stata accettata </h1>
            <p>Questa mail è per informarti che la tua richiesta di cambio orario per l'evento <strong>${seats}</strong> per la prenotazione numero: <h3>${name}</h3> Time-Slots :
            Registrare: ${venue} Guardare:${date}</p>
            <p>è stata accettata</p>
            </div>`
        }
    }
    else if (id == 10) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Aggiornamento sulla richiesta di cambio orario',
            html: `<div>
            <h1>La tua richiesta di cambio orario è stata rifiutata </h1>
            <p>Questa mail è per informarti che la tua richiesta di cambio orario per l'evento <strong>${seats}</strong> per la prenotazione numero: <h3>${name}</h3> Time-Slots :
            Registrare: ${venue} Guardare:${date}</p>
            <p>è stata rifiutata</p>
            </div>`
        }
    }
    else if (id == 11) {
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Aggiornamento sulla richiesta di cambio orario',
            html: `<div>
            <h1>Hai rifiutato al richiesta di cambio orario </h1>
            <p>Questa mail è per informarti che hai rifiutato la richiesta di cambio orario per l'evento <strong>${seats}</strong> per l'ordine numero: <h3>${name}</h3> Fascia oraria :
            Registrare: ${venue} Guardare:${date}</p>
            <p>Il Team B-Enter</p>
            </div>`
        }
    }
    else if (id == 12) {
        console.log(id)
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Nuova richiesta di prenotazione',
            html: `<div>
            <h1>Hai una nuova richiesta di prenotazione</h1>
            <p>Questa mail è per informarti che hai ricevuto una richiesta di prenotazione per l'evento <strong>${name}</strong> per ${seats} posti per la prenotazione numero: <h3>${venue}</h3> Ora: ${date.time} Data :${date.date}</p>
            
            <p>Il Team B-Enter</p>
            <button><a href=${`http://enterworld.it/options.html?Id=${hash}&&button=Accept&&Auth=${encryptedAES.toString().replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l')}`} target="_blank" >Accetta</a></button>
            <button><a href=${`https://enterworld.it/options.html?Id=${hash}&&button=Reject&&Auth=${encryptedAES.toString().replace(/\+/g, 'p1L2u3S').replace(/\//g, 's1L2a3S4h').replace(/=/g, 'e1Q2u3A4l')}`} target="_blank" >Rifiuta</a></button>
            </div>`
        }
    }
    else if (id == 13) {
        console.log(id)
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Nuova richiesta di prenotazione',
            html: `<div>
            <h1>Prenotazione effettuata per ${name} </h1>
            <p>Questa mail è per informarti che hai effettuato una <strong>richiesta di prenotazione</strong> per l'evento ${name} per ${seats} posti per la prenotazione numero: <h3>${venue}</h3> in data : ${date.date } Ora: ${date.time}</p>
            </div>`
        }
    }
    else if (id == 14) {
        console.log(id)
        mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Richiesta di aggiornamento prenotazione',
            html: `<div>
            <h1>Prenotazione cancellata per ${seats}</h1>
            <p>Questa mail è per informarti che la prenotazione ${name} è stata cancellata dall'utente per la data : ${new Date(venue).getDate()+"-"+parseInt(new Date(venue).getMonth())+"-"+new Date(venue).getFullYear()} Ora : ${date}</p>
            <p>Questa fascia oraria è disponibile ora</p>
            </div>`
        }
    }



    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("error", error.message);
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
            if (res.length < 1) {
                result(null, { status: false, message: "No record found" })
            }
            else {
                console.log("ID", res[0].event_id)
                db.query('SELECT * from events', (err, resp) => {
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
        }
    })
}

booking.checkHash = (hash, result) => {
    db.query('SELECT * from booking where id = ?', [hash], (err, res) => {
        if (err) {
            console.log('error while fetching', err)
            result(null, err)
        }
        else if (res.length > 0) {
            console.log('selected')
            result(null, { result: true, message: res[0].hash })
        }
        else {
            result(null, { result: false, message: "No hash found" })
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
    db.query('SELECT * from booking WHERE (DATE(date) >= curdate() OR date="0000-00-00")  AND user_id = ?', id, (err, res) => {
        if (err) {
            console.log("error while fetching")
            result(null, err)

        }
        else {

            if (res.length > 0) {
                db.query('SELECT * from events', (err, resp) => {
                    if (err) {
                        console.log('error while fetching', err)
                        result(null, err)
                    }
                    else {
                        // console.log('selected in' , resp)
                        if (resp.length == 0) {
                            result(null, { status: false })
                        }
                        else {
                            result(null, res, resp)
                        }

                    }
                })
            }
            else {
                result(null, { status: false })
            }
        }
    })
}
booking.getbookingByCatIDRejected = (id, result) => {
    db.query('SELECT * from booking WHERE user_id = ?', id, (err, res) => {
        if (err) {
            console.log("error while fetching")
            result(null, err)

        }
        else {

            if (res.length > 0) {
                db.query('SELECT * from events', (err, resp) => {
                    if (err) {
                        console.log('error while fetching', err)
                        result(null, err)
                    }
                    else {
                        // console.log('selected in' , resp)
                        if (resp.length == 0) {
                            result(null, { status: false })
                        }
                        else {
                            result(null, res, resp)
                        }

                    }
                })
            }
            else {
                result(null, { status: false })
            }
        }
    })
}

//Create model
booking.createbooking = (EmpReqData, result) => {
    console.log(EmpReqData)
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

                    db.query(`SELECT * FROM user WHERE id=?`,
                        [EmpReqData.user_id], (err, rest) => {
                            if (err) {
                                console.log(err)
                                result(null, err)
                            }
                            else {
                                console.log("success")
                                sendNewMail(12, resp[0].contact_email, EmpReqData.seats, resp[0].title, EmpReqData.order_no, date = { date: EmpReqData.date.split("T")[0], time: EmpReqData.time_in.split(".")[0].split(":")[0] + ":" + EmpReqData.time_in.split(".")[0].split(":")[1] }, "8S_0y")
                                sendNewMail(13, rest[0].email, EmpReqData.seats, resp[0].title, EmpReqData.order_no, date = { date: EmpReqData.date.split("T")[0], time: EmpReqData.time_in.split(".")[0].split(":")[0] + ":" + EmpReqData.time_in.split(".")[0].split(":")[1] }, "")
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
    db.query("SELECT * FROM booking WHERE order_no = ?", id, (err, res) => {
        if (err) {
            console.log(err)
            result(null, err)
        }
        // else if (res[0].hash === "") {
        //     result(null, { status: false, message: "Operation cannot be performed. Please contact admin" })
        // }
        else {

            db.query("SELECT email from user WHERE id=?", res[0].user_id, (err, resp) => {
                if (err) {
                    console.log(err)
                    result(null, err)
                }
                else {
                    db.query("UPDATE booking SET status=?, updated_at = ? , hash='' WHERE    order_no=?",
                        [
                            data.status, new Date().toISOString().slice(0, 19).replace('T', ' ')

                            , id], (err, response) => {
                                if (err) {
                                    console.log(err)
                                    result(null, err)
                                }
                                else {
                                    const date = new Date( res[0].date)
                                    const newDate =  (date.getFullYear()+"-"+date.getDate()+"-"+(date.getMonth()+1) )
                                     console.log(newDate)
                                     
                                    if (data.status == 1) {
                                        sendNewMail(4, resp[0].email, res[0].seats, res[0].order_no, res[0].venue, newDate, "")
                                        SendNotification(res[0].user_id, { message: `you recently got your booking no ${(id)} approved.` }, (err, res) => {
                                            console.log(res)
                                        })
                                    }
                                    else if (data.status == 2) {
                                        SendNotification(res[0].user_id, { message: `You got your booking no ${(id)} rejected.` }, (err, notify) => {
                                        })
                                        sendNewMail(3, resp[0].email, res[0].seats, res[0].order_no, res[0].venue, newDate, "")
                                    }
                                    db.query('SELECT * from events WHERE id=?', [res[0].event_id], (err, response) => {
                                        if (err) {

                                            result(null, err)
                                        }
                                        else {
                                            console.log("bokking date", res[0])
                                            if (data.status == 1) {
                                                sendNewMail(5, response[0].contact_email, res[0].order_no, response[0].title, res[0].seats,newDate, "")
                                                result(null, { status: true, message: "UPDATED", id: response.id })
                                            }
                                            else if (data.status == 2) {
                                                sendNewMail(6, response[0].contact_email, res[0].order_no, response[0].title, res[0].seats, newDate, "")
                                                result(null, { status: true, message: "UPDATED", id: response.id })
                                            }
                                        }
                                    })
                                }
                            })
                }

            })
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
        else if (res.length < 1) {
            result(null, { status: false, message: "no user found" })
        }

        else {
            db.query("SELECT email from user WHERE id=?", res[0].user_id, (err, resp) => {
                if (err) {
                    console.log(err)
                    result(null, err)
                }
                else {
                    db.query('UPDATE booking SET seats=?, msg = ? , time_in=?,updated_at = ? , status=0, hash = ? WHERE    id=?',
                        [
                            data.seats, data.msg, data.time_in, new Date().toISOString().slice(0, 19).replace('T', ' '), hash

                            , id], (err, response) => {
                                if (err) {
                                    console.log(err)
                                    result(null, err)
                                }
                                else {
                                    console.log("success")
                                    console.log("resp", resp[0])
                                    console.log("res", res)
                                    db.query('SELECT * from events WHERE id=?', [res[0].event_id], (err, response) => {
                                        if (err) {
                                            console.log(err)
                                            result(null, err)
                                        }
                                        else {
                                            sendNewMail(1, resp[0].email, data.seats, response[0].title, data.msg, data.time_in.split(".")[0].split(":")[0] + ":" + data.time_in.split(".")[0].split(":")[1])
                                            sendNewMail(2, response[0].contact_email, data.seats, response[0].title, order = { order_no: res[0].order_no, date: new Date(res[0].date).getDate() + "-" + new Date(res[0].date).getMonth() + "-" + new Date(res[0].date).getFullYear() }, data.msg, data.time_in.split(".")[0].split(":")[0] + ":" + data.time_in.split(".")[0].split(":")[1])
                                            result(null, { status: true, message: "La prenotazione è stata aggiornata con successo", id: response.id })
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

    db.query("SELECT * from booking where order_no = ?", id, (err, res) => {
        if (err) {
            console.log(err)
            result(null, err)
        }
        // else if (res[0].hash === "") {
        //     console.log(res[0].hash)
        //     result(null, { status: false, message: "Operation cannot be performed. Please contact admin" })
        // }
        else {
            db.query("SELECT email from user WHERE id=?", res[0].user_id, (err, resp) => {
                if (err) {
                    console.log(err)
                    result(null, err)
                }
                else {
                    db.query("UPDATE booking SET status=?, updated_at = ? , hash='' WHERE  order_no=?",
                        [
                            data.status, new Date().toISOString().slice(0, 19).replace('T', ' ')

                            , id], (err, response) => {
                                if (err) {
                                    console.log(err)
                                    result(null, err)
                                }
                                else {
                                    const date = new Date( res[0].date)
                                   const newDate =  (date.getFullYear()+"-"+date.getDate()+"-"+(date.getMonth()+1) )
                                    console.log(newDate)
                                    if (data.status == 1) {
                                        sendNewMail(4, resp[0].email, res[0].seats, res[0].order_no, res[0].venue,newDate, "")
                                        SendNotification(res[0].user_id, { message: `you recently got your booking no ${(id)} approved.` }, (err, notify) => {
                                            // console.log(notify)
                                        })
                                    }
                                    else if (data.status == 2) {
                                        SendNotification(res[0].user_id, { message: `You got your booking no ${(id)} rejected.` }, (err, resto) => {
                                        })
                                        sendNewMail(3, resp[0].email, res[0].seats, res[0].order_no, res[0].venue, newDate, "")
                                    }
                                    db.query('SELECT * from events WHERE id=?', [res[0].event_id], (err, response) => {
                                        if (err) {

                                            result(null, err)
                                        }
                                        else {
                                            if (data.status == 1) {
                                                sendNewMail(5, response[0].contact_email, res[0].order_no, response[0].title, res[0].seats,newDate, "")
                                                result(null, { status: true, message: "Booking Accepted Successfully.", id: response.id })
                                            }
                                            else if (data.status == 2) {
                                                sendNewMail(6, response[0].contact_email, res[0].order_no, response[0].title, res[0].seats, newDate, "")
                                                result(null, { status: true, message: "Booking rejected successfully.", id: response.id })
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
    db.query("SELECT * FROM booking WHERE id=?", [id], (err, sel) => {
        if (err) {
            console.log("Unable to delete")
            result(null, err)
        }
        else if (sel.length < 1) {
            result(null, { status: false, message: "No such booking exists" })
        }
        else {
            db.query(" SELECT * FROM events WHERE id=?", [sel[0].event_id], (err, event) => {
                if (err) {
                    console.log("Unable to delete")
                    result(null, err)
                }
                else {
                    db.query('DELETE FROM booking WHERE id=?', [id], (err, res) => {
                        if (err) {
                            console.log("Unable to delete")
                            result(null, err)
                        }
                        else {
                            console.log("Deleted successfully")
                            event.length > 0 && sendNewMail(14, event[0].contact_email, event[0].title, sel[0].order_no, sel[0].date, sel[0].time_in.split(".")[0].split(":")[0] + ":" + sel[0].time_in.split(".")[0].split(":")[1], "")
                            result(null, { status: true, message: new Date(sel[0].date) })
                        }
                    })


                }

            })
            // db.query('DELETE FROM booking WHERE id=?', [id], (err, res) => {
            //     if (err) {
            //         console.log("Unable to delete")
            //         result(null, err)
            //     }
            //     else {
            //         console.log("Deleted successfully")
            //         result(null, res)
            //     }
            // })
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
                            db.query("UPDATE booking set status = 3 , time_in =? , time_out=? WHERE id = ?", [data.time_in, data.time_out, id], (err, rest) => {
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

booking.ConfirmchangeTimeRequest = (id, data, result) => {
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
                            db.query("UPDATE booking set status = ? WHERE id = ?", [data.status, id], (err, rest) => {
                                if (err) {
                                    console.log(err)
                                    result(null, err)
                                }
                                else {
                                    //    console.log("seats", response)
                                    if (data.status == 1) {
                                        sendNewMail(8, resp[0].email, response[0].title, res[0].order_no, res[0].time_in, res[0].time_out)
                                        sendNewMail(9, response[0].contact_email, response[0].title, res[0].order_no, res[0].time_in, res[0].time_out)
                                    }
                                    else if (data.status == 2) {
                                        sendNewMail(10, response[0].contact_email, response[0].title, res[0].order_no, res[0].time_in, res[0].time_out)
                                        sendNewMail(11, resp[0].email, response[0].title, res[0].order_no, res[0].time_in, res[0].time_out)
                                    }
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