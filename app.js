const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodeMailer = require('nodemailer');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/public' , express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.render('contact', {layout: false});
});

app.post('/send', (req, res) => {
    const output = `
    <h1>You Have a New Message</h1>
    <ul>
        <li><h2>From: ${req.body.First_Name} ${req.body.Last_Name}</h2></li>
        <li><h2>Email: ${req.body.Email}</h2></li>
        <li><h2>Registration Number: ${req.body.Registration_Number}</h2></li>
        <li><h2>Branch: ${req.body.Branch}</h2></li>
        <li><h2>Mobile: ${req.body.Phone_Number}</h2></li>
    </ul>
    <h1> Submitted Code:</h1>
    <h2>${req.body.Message}</h2>
    `;

    var transporter = nodeMailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
          user: 'developer.noob.me@gmail.com',
          pass: 'iamnoobdev'
        },
        tls:{
            rejectUnauthorized: false
        }
      });
      var mailOptions = {
        from: 'developer.noob.me@gmail.com',
        to: 'saisoumyaknanda@gmail.com',
        subject: 'Code Submission',
        text: 'That was easy!',
        html: output
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return console.log(error);
        } 
          console.log('Email sent: %s', info.messageId);
      });

});

app.listen(3000, () =>  console.log('Server started...'));

