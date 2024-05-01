const express = require('express');
const session = require('express-session'); // Add session middleware
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan'); // Logging middleware
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const axios = require('axios');

const multer = require('multer'); // Import Multer

const app = express();
const PORT = 5000;

// Application-level middleware
app.use(cors({ 
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow sending cookies with the request
}));
app.use(express.json()); // Body parsing middleware

app.use(cookieParser());
app.use(session({
  secret: '5372E653ED6BD22E09BF14DE621CAFBFEA8B1391C056B73F3A0FECB31BD4E1B8',
  cookie: { maxAge : 2592000000 },
  resave: true,
  saveUninitialized: true
}));


// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:5000';

// Logging middleware
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});



// MongoDB connection setup
mongoose.connect('mongodb://127.0.0.1:27017/shyam', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// Define a routing-level middleware function , and profling
const logTimestamp = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    console.log(${req.method} ${req.path} ${res.statusCode} ${elapsed}ms);
  });
  next();
};

// Register the middleware function to be used for all routes
app.use(logTimestamp);


// Replace with your email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'graduatesworld7@gmail.com',
      pass: 'psqy tocg qspm vrat',
    },
  });

  
  // Generate a random 6-digit OTP
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
  function generateRandomPassword() {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
  
    return password;
  }
  // Store OTPs and corresponding email addresses
  const otpMap = new Map();


  const generateToken = (user) => {
    return jwt.sign({ email: user.email }, '5372E653ED6BD22E09BF14DE621CAFBFEA8B1391C056B73F3A0FECB31BD4E1B8', { expiresIn: '1h' });
  };
  
  const verifyToken = (token) => {
    return jwt.verify(token, '5372E653ED6BD22E09BF14DE621CAFBFEA8B1391C056B73F3A0FECB31BD4E1B8');
  };

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//         cb(null, './uploads'); // Specify the destination directory
//     },
//     filename: function (req, file, cb) {
//         cb(false, Date.now()+'--'+file.originalname); // Define the filename
//     }
// });

const fileStorageEngine=multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null,'./uploads')
  },
  filename:(req,file,cb)=>{
      cb(false,Date.now()+'--'+file.originalname)
  }
})

// const upload = multer({ storage: storage });
  
const upload=multer({storage:fileStorageEngine})

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phonenumber: String,
  educationlevel:String,
  experience:Number,
  specialization:String,
});

const ExpertSchema = new mongoose.Schema({
    email: String,
    username: String,
    phonenumber: Number,
    experience: Number,
});

const AdminSchema = new mongoose.Schema({
    email: String,
    password: String,
});
const ExpertLogin = new mongoose.Schema({
  email: String,
  password: String,
});

const Jobs = new mongoose.Schema({
  role: String,
  company: String,
  location: String,
  requirements: String,
});

const UserModel = mongoose.model('User', UserSchema);
const ExpertModel = mongoose.model('Expert',ExpertSchema)
const AdminModel = mongoose.model('Admin',AdminSchema)
const ExpertLoginModel = mongoose.model('Expertlogin',ExpertLogin)
const JobModel = mongoose.model('AvailableJob',Jobs)

let otp1 = ""
let otp2 = ""
let username=""
let email =""
let password =""
let phonenumber=""
let educationlevel=""
let experience=""
let specialization=""

app.get('/api/applicants', async (req, res) => {
  try {
    const applicants = await UserModel.find();

    res.json(applicants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/register' ,upload.single('resume') , async (req, res,next) => {
  try {
    username = req.body.username;
    email = req.body.email;
    password = req.body.password;
    educationlevel=req.body.educationLevel;
    experience=req.body.workExperience;
    specialization=req.body.specialization;
    phonenumber=req.body.phonenumber;

    console.log(req.file);

    // const resume = req.body.resume; // Access the uploaded resume file

    // console.log(resume);

    otp1 = generateOTP();
    const mailOptions = {
      from: 'graduatesworld7@gmail.com',
      to: email,
      subject: 'OTP for your application',
      text: `Your OTP is: ${otp1}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
      }
      catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

  }
   catch (error) {
    console.error(error);
    return next(error);
    //res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/verify_otp' , async (req,res,next)=>{

 try { 
    const {otp} = req.body;
    console.log(otp)
    console.log(otp1)

    if (otp!=otp1) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }
    else {
      try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
        }

        const newUser = new UserModel({ username, email, password,phonenumber,educationlevel,experience,specialization });
        await newUser.save();

        res.status(201).json(newUser);
        }
    catch(error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
} 
 } catch(error){
     console.log(error);
     return next(error);
 }  
});

let email1 =""
app.post('/api/send_otp',async (req,res,next)=>{

    try{
    email1 = req.body.email;
    console.log(email1)

    const existingUser = await UserModel.findOne({ email: email1 });

    console.log(existingUser)

    if(existingUser) {
        otp2 = generateOTP();
        const mailOptions = {
        from: 'graduatesworld7@gmail.com',
        to: email1,
        subject: 'OTP for your application',
        text:  `Your OTP is: ${otp2}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        }
        catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        }
    else {
        alert("Invalid Credentials")
        console.error("No user found");
    }
  } catch(error){
    console.log(error);
    return next(error);
  }
});

app.post('/api/verify_otp1',async (req,res,next)=>{
  try{
    const {otp} = req.body;
    console.log(otp)
    console.log(otp2)
    if (otp!=otp2) {
        return res.status(400).json({ error: 'Invalid OTP' });
      }
    else {
      return res.status(200).json({messege:"Verfication Successful"})
} 
  } catch(error){
    console.log(error);
    return next(error);
  }  
});

app.post('/api/pass_update',async (req,res,next)=>{
    try {
        const newPassword = req.body.password;
        // console.log(newPassword)
        // Find the user by email
        // console.log(email1)
        const user = await UserModel.findOne({email:email1});
        // If the user is not found, return an error
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Update the user's password in the database
        await UserModel.updateOne({ email: email1 }, { $set: { password: newPassword } });
    
        return res.status(200).json({ message: 'Password updated successfully' });
      }
       catch (error) {
        console.error('Error updating password:', error);
        return next(error);
        //res.status(500).json({ error: 'Internal Server Error' });
      }
       
});

var temp;

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user);
    req.session.token = token;
    req.session.userName = user.username; // Set the username in the session
    temp = user.username;
    // console.log('Username set in session:', req.session); // Add this line to debug


    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Add this route to your Express server code
app.get('/api/userName', (req, res) => {
  try {
    console.log('Session:', req.session);
    const userName = temp;
    // const userName = req.session.userName; // Retrieve the username from the session
    // console.log('Username retrieved from session:', userName); // Add this line to debug
    res.status(200).json({ userName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this route to your Express server code
app.post('/api/logout', (req, res) => {
  console.log(req.session)
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  });
});



app.post('/api/expertRegister', async (req, res,next) => {
    try {
      const {email,username,phonenumber,experience } = req.body;
      const existingExpert = await ExpertModel.findOne({ email });
  
      if (existingExpert) {
        return res.status(400).json({ error: 'Email already registered' });
      }
  
      const newExpert = new ExpertModel({ email, username,phonenumber,experience });
      await newExpert.save();
  
      res.status(201).json(newExpert);
    } catch (error) {
      console.error(error);
      return next(error);
      //res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 
  let email2 =""

  app.post('/api/select_expert',async (req,res,next)=>{

    try{
    email2 = req.body.email;

    const existingUser = await ExpertModel.findOne({ email: email2 });

    console.log(existingUser)

    if(existingUser) {
        const pass = generateRandomPassword();
        const mailOptions = {
        from: 'graduatesworld7@gmail.com',
        to: email2,
        subject: 'Login Credentials',
        text: `Your Password is: ${pass}.
        You can change it by clicking forgot password in login page`,
        };
        try {
          await transporter.sendMail(mailOptions);
          res.status(200).json({ message: 'Email sent successfully' });

          const newExpert = new ExpertLoginModel({ email:email2, password:pass });
          await newExpert.save();
      }
      catch (error) {
          console.error('Error sending email:', error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
      }
  else {
      console.error("No Expert found");
      return res.status(404).json({ error: 'No Expert found' });
  }
} catch(error){
  console.log(error);
   return next(error);
}
});

let email3 =""
app.post('/api/remove_expert',async (req,res,next)=>{

try{
email3 = req.body.email;

const existingUser = await ExpertModel.findOne({ email: email3 });

console.log(existingUser)

if(existingUser) {
  await ExpertLoginModel.deleteOne({ email: email3 });
  res.status(200).json({ message: 'Expert Removed successfully' });
  }
else {
    console.error("No Expert found");
    return res.status(404).json({ error: 'No Expert found' });
}
}  catch(error){
console.log(error);
return next(error);
}
});

let email4 =""
app.post('/api/remove_user',async (req,res,next)=>{

try{
email4 = req.body.email;

const existingUser = await UserModel.findOne({ email: email4 });

console.log(existingUser)

if(existingUser) {
  await UserModel.deleteOne({ email: email4 });
  res.status(200).json({ message: 'User Removed successfully' });
  }
else {
    console.error("No User found");
    return res.status(404).json({ error: 'No User found' });
}
} catch(error){
console.log(error);
return next(error);
}
});

app.post('/api/addjobs', async (req, res,next) => {
try {
  const {role,company,location,requirements } = req.body;
  const existingjobs = await JobModel.findOne({ role });

  if (existingjobs) {
    return res.status(400).json({ error: 'Job already available' });
  }

  const newJob = new JobModel({ role,company,location,requirements });
  await newJob.save();

  res.status(201).json(newJob);
} catch (error) {
  console.error(error);
  return next(error);
  //res.status(500).json({ error: 'Internal Server Error' });
}
});

var temp3;
app.post('/api/expertlogin', async (req, res,next) => {
try {
  const { email, password } = req.body;
  console.log(email)
  const expert = await ExpertLoginModel.findOne({ email });
  const expert1 = await ExpertModel.findOne({ email });
  
  console.log(expert)
  if (!expert) {
    return res.status(404).json({ error: 'Expert not found' });
  }

  // Directly compare plain text passwords
  if (password === expert.password) {
    // If the passwords match, you can consider the user authenticated
    // You may want to generate and send a token for further authentication
    // console.log('Login Successful')
    const token = generateToken(expert1);
  req.session.token = token;
  req.session.expertName = expert1.username; // Set the username in the session
  temp3 = expert1.username;

    res.status(200).json({message:"SuccessFull "});
  } else {
    console.log("Access Restricted")
    res.status(401).json({ error: 'Incorrect password' });
  }
} catch (error) {
  console.error(error);
  return next(error);
  //res.status(500).json({ error: 'Internal Server Error' });
}
});

// Add this route to your Express server code
app.get('/api/expertName', (req, res) => {
try {
  // Retrieve expert name from session or database
  const expertName = temp3;
  // const expertName = req.session.expertName; // Assuming you set the expert's name in the session
  res.status(200).json({ expertName });
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
});
// Add this route to your Express server code
app.post('/api/expertLogout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  });
});


let email5 =""
let otp3 =""
app.post('/api/expert_forgot',async (req,res,next)=>{

  try{
    email5 = req.body.email;
    console.log(email5)

    const existingUser = await ExpertLoginModel.findOne({ email: email5 });

    console.log(existingUser)

    if(existingUser) {
        otp3 = generateOTP();
        const mailOptions = {
        from: 'graduatesworld7@gmail.com',
        to: email5,
        subject: 'OTP for your application',
        text: `Your OTP is: ${otp3}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Email sent successfully' });
        }
        catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        }
    else {
        console.error("No expert found");
        return res.status(404).json({ error: 'No Expert found' });
    }
  } catch(error){
    console.log(error);
   return next(error);
  }
});

app.post('/api/verify_otp2',async (req,res,next)=>{

  try{
  const {otp} = req.body;
  console.log(otp)
  console.log(otp3)
  if (otp!=otp3) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
  else {
    return res.status(200).json({messege:"Verfication Successful"})
}  
  } catch(error){
      console.log(error);
      return next(error);
  } 
});

app.post('/api/expertpass_update',async (req,res,next)=>{
  try {
      const newPassword = req.body.password;
      // console.log(newPassword)
      // Find the user by email
      // console.log(email1)
      const user = await ExpertLoginModel.findOne({email:email5});
      // If the user is not found, return an error
      if (!user) {
        return res.status(404).json({ error: 'Expert not found' });
      }
  
      // Update the user's password in the database
      await ExpertLoginModel.updateOne({ email: email5 }, { $set: { password: newPassword } });
  
      return res.status(200).json({ message: 'Password updated successfully' });
    }
     catch (error) {
      console.error('Error updating password:', error);
      return next(error);
      //res.status(500).json({ error: 'Internal Server Error' });
    }
     
});

var temp2;
  app.post('/api/adminlogin', async (req, res,next) => {
    try {
      const { email, password } = req.body;
      console.log(email)
      const admin = await AdminModel.findOne({ email });
      console.log(admin)
      if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
      }
  
      // Directly compare plain text passwords
      if (password === admin.password) {
        // If the passwords match, you can consider the user authenticated
        // You may want to generate and send a token for further authentication
        // console.log('Login Successful')
        const token = generateToken(admin);
    req.session.token = token;
    req.session.adminName = admin.email; // Set the username in the session
    temp2 = admin.email;
        res.status(200).json({message:"SuccessFull "});
      } else {
        console.log("Access Restricted")
        res.status(401).json({ error: 'Incorrect password' });
      }
    } catch (error) {
      console.error(error);
      return next(error);
      //res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // Add route for fetching admin's name
app.get('/api/adminName', (req, res) => {
  try {
    const adminName = temp2;
    // const adminName = req.session.adminName;
    res.status(200).json({ adminName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Add route for admin logout
app.post('/api/adminLogout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error logging out:', err);
        return res.status(500).json({ error: 'Failed to logout' });
      }
      res.clearCookie('token');
      res.status(200).json({ message: 'Admin logged out successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Error handling middleware to catch any uncaught errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});





// const express = require('express');
// const nodemailer = require('nodemailer')
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/shyam', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// // Replace with your email configuration
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'graduatesworld7@gmail.com',
//       pass: 'psqy tocg qspm vrat',
//     },
//   });
  
//   // Generate a random 6-digit OTP
//   const generateOTP = () => Math.floor(100000 + Math.random() * 900000);
//   function generateRandomPassword() {
//     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
//     let password = "";
    
//     for (let i = 0; i < 8; i++) {
//       const randomIndex = Math.floor(Math.random() * charset.length);
//       password += charset[randomIndex];
//     }
  
//     return password;
//   }
//   // Store OTPs and corresponding email addresses
//   const otpMap = new Map();

// const UserSchema = new mongoose.Schema({
//   username: String,
//   email: String,
//   password: String,
//   phonenumber: String,
//   educationlevel:String,
//   experience:Number,
//   specialization:String,
// });

// const ExpertSchema = new mongoose.Schema({
//     email: String,
//     username: String,
//     phonenumber: Number,
//     experience: Number,
// });

// const AdminSchema = new mongoose.Schema({
//     email: String,
//     password: String,
// });

// const ExpertLogin = new mongoose.Schema({
//   email: String,
//   password: String,
// });

// const Jobs = new mongoose.Schema({
//   role: String,
//   company: String,
//   location: String,
//   requirements: String,
// });

// const UserModel = mongoose.model('User', UserSchema);
// const ExpertModel = mongoose.model('Expert',ExpertSchema)
// const AdminModel = mongoose.model('Admin',AdminSchema)
// const ExpertLoginModel = mongoose.model('Expertlogin',ExpertLogin)
// const JobModel = mongoose.model('AvailableJob',Jobs);
// app.get('/api/applicants', async (req, res) => {
//   try {
//     const applicants = await UserModel.find();

//     res.json(applicants);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


// let otp1 = ""
// let otp2 = ""
// let username=""
// let email =""
// let password =""
// let phonenumber=""
// let educationlevel=""
// let experience=""
// let specialization=""
// app.post('/api/register', async (req, res) => {
//   try {
//     username = req.body.username;
//     email = req.body.email;
//     password = req.body.password;
//     educationlevel=req.body.educationLevel;
//     experience=req.body.workExperience;
//     specialization=req.body.specialization;
//     phonenumber=req.body.phonenumber;


//     otp1 = generateOTP();
//     const mailOptions = {
//       from: 'graduatesworld7@gmail.com',
//       to: email,
//       subject: 'OTP for your application',
//       text: `Your OTP is: ${otp1}`,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ message: 'Email sent successfully' });
//       }
//       catch (error) {
//         console.error('Error sending email:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }

//   }
//    catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/api/verify_otp',async (req,res)=>{
//     const {otp} = req.body;
//     console.log(otp)
//     console.log(otp1)

//     if (otp!=otp1) {
//         return res.status(400).json({ error: 'Invalid OTP' });
//       }
//     else {
//       try {
//         const existingUser = await UserModel.findOne({ email });

//         if (existingUser) {
//         return res.status(400).json({ error: 'Email already registered' });
//         }

//         const newUser = new UserModel({ username, email, password,phonenumber,educationlevel,experience,specialization });
//         await newUser.save();

//         res.status(201).json(newUser);
//         }
//     catch(error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// }   
// });

// let email1 =""
// app.post('/api/send_otp',async (req,res)=>{
//     email1 = req.body.email;
//     console.log(email1)

//     const existingUser = await UserModel.findOne({ email: email1 });

//     console.log(existingUser)

//     if(existingUser) {
//         otp2 = generateOTP();
//         const mailOptions = {
//         from: 'graduatesworld7@gmail.com',
//         to: email1,
//         subject: 'OTP for your application',
//         text: `Your OTP is: ${otp2}`,
//         };

//         try {
//             await transporter.sendMail(mailOptions);
//             res.status(200).json({ message: 'Email sent successfully' });
//         }
//         catch (error) {
//             console.error('Error sending email:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//         }
//     else {
//         alert("Invalid Credentials")
//         console.error("No user found");
//     }
// });

// app.post('/api/verify_otp1',async (req,res)=>{
//     const {otp} = req.body;
//     console.log(otp)
//     console.log(otp2)
//     if (otp!=otp2) {
//         return res.status(400).json({ error: 'Invalid OTP' });
//       }
//     else {
//       return res.status(200).json({messege:"Verfication Successful"})
// }   
// });

// app.post('/api/pass_update',async (req,res)=>{
//     try {
//         const newPassword = req.body.password;
//         // console.log(newPassword)
//         // Find the user by email
//         // console.log(email1)
//         const user = await UserModel.findOne({email:email1});
//         // If the user is not found, return an error
//         if (!user) {
//           return res.status(404).json({ error: 'User not found' });
//         }
    
//         // Update the user's password in the database
//         await UserModel.updateOne({ email: email1 }, { $set: { password: newPassword } });
    
//         return res.status(200).json({ message: 'Password updated successfully' });
//       }
//        catch (error) {
//         console.error('Error updating password:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//       }
       
// });

// app.post('/api/login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const user = await UserModel.findOne({ email });
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       if (password === user.password) {
//         res.status(200).json({message:"SuccessFull "});
//       } 
//       else {
//         res.status(401).json({ error: 'Incorrect password' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//   app.post('/api/expertRegister', async (req, res) => {
//     try {
//       const {email,username,phonenumber,experience } = req.body;
//       const existingExpert = await ExpertModel.findOne({ email });
  
//       if (existingExpert) {
//         return res.status(400).json({ error: 'Email already registered' });
//       }
  
//       const newExpert = new ExpertModel({ email, username,phonenumber,experience });
//       await newExpert.save();
  
//       res.status(201).json(newExpert);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//   let email2 =""

//   app.post('/api/select_expert',async (req,res)=>{
//     email2 = req.body.email;

//     const existingUser = await ExpertModel.findOne({ email: email2 });

//     console.log(existingUser)

//     if(existingUser) {
//         const pass = generateRandomPassword();
//         const mailOptions = {
//         from: 'graduatesworld7@gmail.com',
//         to: email2,
//         subject: 'Login Credentials',
//         text: `Your Password is: ${pass}.
//         You can change it by clicking forgot password in login page`,
//         };

//         try {
//             await transporter.sendMail(mailOptions);
//             res.status(200).json({ message: 'Email sent successfully' });

//             const newExpert = new ExpertLoginModel({ email:email2, password:pass });
//             await newExpert.save();
//         }
//         catch (error) {
//             console.error('Error sending email:', error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//         }
//     else {
//         console.error("No Expert found");
//     }
// });

// let email3 =""
// app.post('/api/remove_expert',async (req,res)=>{
//   email3 = req.body.email;

//   const existingUser = await ExpertModel.findOne({ email: email3 });

//   console.log(existingUser)

//   if(existingUser) {
//     await ExpertLoginModel.deleteOne({ email: email3 });
//     res.status(200).json({ message: 'Expert Removed successfully' });
//     }
//   else {
//       console.error("No Expert found");
//   }
// });

// let email4 =""
// app.post('/api/remove_user',async (req,res)=>{
//   email4 = req.body.email;

//   const existingUser = await UserModel.findOne({ email: email4 });

//   console.log(existingUser)

//   if(existingUser) {
//     await UserModel.deleteOne({ email: email4 });
//     res.status(200).json({ message: 'User Removed successfully' });
//     }
//   else {
//       console.error("No User found");
//   }
// });

// app.post('/api/addjobs', async (req, res) => {
//   try {
//     const {role,company,location,requirements } = req.body;
//     const existingjobs = await JobModel.findOne({ role });

//     if (existingjobs) {
//       return res.status(400).json({ error: 'Job already available' });
//     }

//     const newJob = new JobModel({ role,company,location,requirements });
//     await newJob.save();

//     res.status(201).json(newJob);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// app.post('/api/expertlogin', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log(email)
//     const expert = await ExpertLoginModel.findOne({ email });
//     console.log(expert)
//     if (!expert) {
//       return res.status(404).json({ error: 'Expert not found' });
//     }

//     // Directly compare plain text passwords
//     if (password === expert.password) {
   
     
//       // console.log('Login Successful')
//       res.status(200).json({message:"SuccessFull "});
//     } else {
//       console.log("Access Restricted")
//       res.status(401).json({ error: 'Incorrect password' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// let email5 =""
// let otp3 =""
// app.post('/api/expert_forgot',async (req,res)=>{
//     email5 = req.body.email;
//     console.log(email5);

//     const existingUser = await ExpertLoginModel.findOne({ email: email5 });

//     console.log(existingUser)

//     if(existingUser) {
//         otp3 = generateOTP();
//         const mailOptions = {
//         from: 'graduatesworld7@gmail.com',
//         to: email5,
//         subject: 'OTP for your application',
//         text: `Your OTP is: ${otp3}`,
//         };

//         try {
//             await transporter.sendMail(mailOptions);
//             res.status(200).json({ message: 'Email sent successfully' });
//         }
//         catch (error) {
//           console.error('Error sending email:', error);
//           res.status(500).json({ error: 'Internal Server Error' });
//         }
//         }
//     else {
//       res.status(404).json({ error: 'No expert found with this email' });
//     }
// });

// app.post('/api/verify_otp2',async (req,res)=>{
//   const {otp} = req.body;
//   console.log(otp)
//   console.log(otp3)
//   if (otp!=otp3) {
//       return res.status(400).json({ error: 'Invalid OTP' });
//     }
//   else {
//     return res.status(200).json({messege:"Verfication Successful"})
// }   
// });

// app.post('/api/expertpass_update',async (req,res)=>{
//   try {
//       const newPassword = req.body.password;
//       // console.log(newPassword)
//       // Find the user by email
//       // console.log(email1)
//       const user = await ExpertLoginModel.findOne({email:email5});
//       // If the user is not found, return an error
//       if (!user) {
//         return res.status(404).json({ error: 'Expert not found' });
//       }
  
//       // Update the user's password in the database
//       await ExpertLoginModel.updateOne({ email: email5 }, { $set: { password: newPassword } });
  
//       return res.status(200).json({ message: 'Password updated successfully' });
//     }
//      catch (error) {
//       console.error('Error updating password:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
     
// });


//   app.post('/api/adminlogin', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       console.log(email)
//       const admin = await AdminModel.findOne({ email });
//       console.log(admin)
//       if (!admin) {
//         return res.status(404).json({ error: 'Admin not found' });
//       }
  
//       // Directly compare plain text passwords
//       if (password === admin.password) {
//         // If the passwords match, you can consider the user authenticated
//         // You may want to generate and send a token for further authentication
//         // console.log('Login Successful')
//         res.status(200).json({message:"SuccessFull "});
//       } else {
//         console.log("Access Restricted")
//         res.status(401).json({ error: 'Incorrect password' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
