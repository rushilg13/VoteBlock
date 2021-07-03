const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const { Auth } = require("two-step-auth");
const app = express()
const port = 4000

app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/voteblock', {useNewUrlParser:true, useUnifiedTopology:true})
.then( () => console.log("Connection Successfull!"))
.catch( (err) => console.log(err));

const user_Schema = new mongoose.Schema({
  regno : { type: String, required: true },
  name : { type: String, required: true },
  email : { type: String, required: true },
  dob: { type: Date, required: true },
  password : { type: String, required: true },
  otp : { type: Number, default: null },
})

const User_Detail = new mongoose.model("User_Detail", user_Schema);

// const user1 = new User_Detail({
//   regno : "19BCE0398",
//   name : "Janvi Prasad",
//   email : "janvi@gmail.com",
//   password : "janvi",
//   dob : new Date("2001-06-21")
// })
// user1.save();

const getDocument = async () => {
  const result = await User_Detail.find();
  console.log(result);
}
getDocument();


const login = async (emailId) => {
  const res = await Auth(emailId, "VOTEBLOCK");
  console.log(res.mail, res.OTP);
  User_Detail.updateOne({email: res.mail}, {otp: res.OTP});
}

// login("rushil@gmail.com");

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({secret: '18051301voteblock', saveUninitialized: true, resave: false}));
app.use(cookieParser("Secret"))

var sess;

app.get('/', (req, res) => {
  res.render('register.ejs');
})

app.post('/register', (req, res) => {
  if(req.body.pass1 != req.body.pass2)
  {
    console.log("Passwords Do not Match!");
    return res.render('register.ejs');
  }

  User_Detail.findOne({email: req.body.email}).then(function(data){
    if(data == null)
    {
      const user = new User_Detail(
        {
          "regno" : req.body.regno,
          "name" : req.body.name,
          "email" : req.body.email,
          "password" : req.body.pass1,
          "date" : req.body.dob,
        }
      )
      console.log(user);
      // user.save();
        req.session.email = req.body.email;
        res.redirect('/home');
    }

    else if(req.body.email == data.email)
    {
      console.log("User Already Exists!")
      res.redirect('/register')
    }
  });
})

app.get('/login', (req, res) => {
  res.render('login.ejs');
})

app.post('/login', (req, res) => {
  console.log(req.body);
  User_Detail.findOne({email: req.body.email}).then(function(data){
    if (data === null)
    {
      console.log("No User Found");
      res.redirect('/login');
    }
    else if(data.password == req.body.pass1)
    {
      req.session.email = data.email;
      res.redirect('/home');
    }
    else
    {
      console.log("Incorrect Password")
      res.redirect('/login');
    }
}).catch(err => console.log('Caught:', err.message));
})

app.get('/home', (req, res) => {
  if (!req.session.email)
  {return res.status(401).redirect('/login');}
  res.render('home.ejs');
})

app.get('/logout', (req, res) => {
  if(req.session.email) {
      delete req.session.email;
      res.redirect('/login');
  } else {
      res.redirect('/login');
  }        
});

app.get('/reset', (req, res) => {
  res.render('reset.ejs');
})

app.post('/reset', (req, res) =>{
  User_Detail.findOne({email: req.body.email}).then(function(data){
    if (data === null)
    {
      console.log("Email ID is not registered");
      return res.redirect('/login');
    }
    else
    {
      login(req.body.email);
      req.session.otpEmail = req.body.email;
      return res.redirect('/otp');
    }
}).catch(err => console.log('Caught:', err.message));
})

app.get('/otp', (req, res) => {
  res.render('otp.ejs');
})

app.post('/otp', (req, res) =>{
  User_Detail.findOne({email: req.session.otpEmail}).then(function(data){
    if (!req.session.otpEmail)
    {
      return res.redirect('/login');
    }
    else
    {
      if(data.otp == req.body.otp)
      {
        return res.redirect('/password');
      }
      else
      {
        console.log(data.otp)
        console.log('Incorrect OTP');
        res.redirect('/otp');
      }
    }
}).catch(err => console.log('Caught:', err.message));
})

app.get('/password', (req, res) => {
  res.render('password.ejs');
})

app.post('/password', (req, res) => {
  if(req.body.pass1 != req.body.pass2)
  {
    console.log("Passwords Do not Match!");
    return res.redirect("/password");
  }

  User_Detail.findOne({email: req.session.otpEmail}).then(function(data){
    if(data == null)
    {
      console.log('User not Registered!');
      return redirect('/login')
    }
  });
      User_Detail.updateOne({email: req.session.otpEmail}, {password: req.body.pass1}).then(function(data){
        console.log("Password Updated");
        return res.redirect('/login');
      })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
