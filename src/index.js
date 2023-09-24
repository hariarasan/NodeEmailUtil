// ./src/index.js

require('dotenv/config')
var express = require('express');
var app = express();
var fs = require("fs");
var mailer = require("./mail.js")

const cors = require("cors")
const bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.json());

app.post('/submit', function (req, res) {   
      const reqBody = req.body;      
      console.log( reqBody );

      var emailText = "<div> Dear " + reqBody.customerName + ", <br/> <br/>" + 
                  "Thanks for placing the order with Anandam Crackers. "+ " <br/> " +                   
                  "Given below the estimate. Our sales representative will contact you shortly. " + "<br/> <br/>"                  
                  + "</div>"; 

      var customerDetails = "<br/><div> Your Contatct No. " + reqBody.customerMobile + " </div><br/> " + 
                            "<div> Your Delivery Details are : " + reqBody.customerAddress  + "</div><br/>";
                             
                  
      var emailFooter = "<br/><br/>" + "<div> Thanks, </div>" + 
                        "<div> Anandam Crackers </div>" + 
                        "<div> Mobile # : 9943450902 / 9840248087 / 9786921234</div>" + 
                        "<div> Email    : Anandamcrackersagency@gmail.com </div>"
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      console.log(" Email : " + process.env.EMAIL)
      mailer.sendEmail({
            subject: "Anandam Crackers - Estimate for your Crackers Order",
            html: emailText + reqBody.emailHtmlContent + customerDetails + emailFooter,
            to: reqBody.customerEmail,
            cc: "ktsm1982@gmail.com",
            bcc: "rbabu2165@gmail.com",
            from: process.env.EMAIL
      });      

      res.send({response:'Your Order Submitted Successfully'});   
})

var server = app.listen(process.env.PORT || 5000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Email Util app listening at http://%s:%s", host, port)
})