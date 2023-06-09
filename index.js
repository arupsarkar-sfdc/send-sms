const express = require('express')
const moment = require('moment')
const axios = require('axios')
const app = express();

const port = process.env.PORT || 8082;

require("dotenv").config()

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)


app.get('/', async (req, res) => {
    try{

        const currentDateTime = moment().format('MMMM Do YYYY, h:mm:ss a')
        // get query parameters from req object
        const { phone } = req.query
        console.log(`phone: ${phone}`)
        client.messages
            .create({
                body: `${currentDateTime} - Good news !!! This week we are having 15% discount`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: phone
            })
            .then((message) => {
                console.log(JSON.stringify(message))
                res.send(message.sid)
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                console.log('\n Done.')
            })
    }catch(err){
        console.error(err)
    }
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));
