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

      var emailFooter = "<br/><div> Thanks, </div>" + 
                        "<div> Anandam Crackers </div>" + 
                        "<div> Mobile # : 9943450902 </div>" + 
                        "<div> Email    :  </div>"
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      mailer.sendEmail({
            subject: "Anandam Crackers - Estimate for your Crackers Order",
            html: emailText + reqBody.emailHtmlContent + emailFooter,
            to: "hariaccet06@gmail.com",
            from: process.env.EMAIL
      });      

      res.send({response:'Your Order Submitted Successfully'});   
})

var server = app.listen(process.env.PORT || 5000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})