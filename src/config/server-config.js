const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path : path.resolve(__dirname , '../../.env')});

// console.log(process.env) 

module.exports = {
    "PORT" : process.env.PORT,
    "GMAIL_PASS" : process.env.GMAIL_PASS,
    "GMAIL_EMAIL" : process.env.GMAIL_EMAIL
}