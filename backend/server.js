/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: Operations related to articles
 */
/**
 * @swagger
 * /api/applicants:
 *   get:
 *     summary: Get all applicants
 *     responses:
 *       '200':
 *         description: A list of all applicants
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phonenumber:
 *                 type: string
 *               educationlevel:
 *                 type: string
 *               experience:
 *                 type: number
 *               specialization:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/send_otp:
 *   post:
 *     summary: Send OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: OTP sent successfully
 *       '400':
 *         description: Invalid credentials or user not found
 *       '500':
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/verify_otp:
 *   post:
 *     summary: Verify OTP To Register
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Verification successful
 *       '400':
 *         description: Invalid OTP
 */

/**
 * @swagger
 * /api/verify_otp1:
 *   post:
 *     summary: Verify OTP First To Enter New Password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Verification successful
 *       '400':
 *         description: Invalid OTP
 */
/** 
* @swagger
* /api/pass_update:
*   put:
*     summary: Enter New password To Update
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               password:
*                 type: string
*     responses:
*       '200':
*         description: Password updated successfully
*       '404':
*         description: User not found
*       '500':
*         description: Internal Server Error
*/

/**
 * @swagger
 * /api/remove_user:
 *   delete:
 *     summary: Remove a user by email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User removed successfully
 *       '404':
 *         description: No user found with the provided email
 *       '500':
 *         description: Internal Server Error
 */







const express = require('express');
const session = require('express-session'); // Add session middleware
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan'); // Logging middleware
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

const axios = require('axios');

const multer = require('multer'); // Import Multer
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions=require('./swagger');
const app = express();
const port = process.env.PORT || 5000;

  // origin : ["https://graduateworld.netlify.app/"],
  // methods : ["POST","GET","DELETE","PUT"],
  // credentials: true
// Application-level middleware
app.use(cors());
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



// // MongoDB connection setup
// mongoose.connect('mongodb://127.0.0.1:27017/shyam', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect('mongodb+srv://srivikas:vikas2004@cluster0.cuihvzg.mongodb.net/shyam?retryWrites=true&w=majority&appName=Cluster0');



// Define a routing-level middleware function , and profling --- third party
const logTimestamp = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const elapsed = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} ${elapsed}ms`);
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

// Add express-session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign({ email: user.email }, 'your-secret-key', { expiresIn: '1h' });
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
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  salaryFrom: { type: Number },
  salaryTo: { type: Number },
  fixedSalary: { type: Number },
});

// Define the business location schema
const businessLocationSchema = new mongoose.Schema({
  _id: {
    type: String, // Change the type to String
    required: true
  },
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
});
const quizResultSchema = new mongoose.Schema({
  useremail: String,
  score: Number,
  totalscore: Number,
});

const quizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number,
});

const Quiz = mongoose.model('Quiz', quizSchema);



const QuizResult = mongoose.model('QuizResult', quizResultSchema);

// Create a model based on the schema
const BusinessLocation = mongoose.model('BusinessLocation', businessLocationSchema);

const UserModel = mongoose.model('User', UserSchema);
const ExpertModel = mongoose.model('Expert',ExpertSchema)
const AdminModel = mongoose.model('Admin',AdminSchema)
const ExpertLoginModel = mongoose.model('Expertlogin',ExpertLogin)
const Job= mongoose.model('Job',Jobs)

let otp1 = ""
let otp2 = ""
let username=""
let email =""
let password =""
let phonenumber=""
let educationlevel=""
let experience=""
let specialization=""


let cachedQuestions = null;

app.get('/api/quiz', async (req, res) => {
    try {
        if (!cachedQuestions) {
            // Fetch quiz data from the cache
            cachedQuestions = await Quiz.find({}).lean();

            if (cachedQuestions.length === 0) {
                // Initialize the database with default questions
                const session = await Quiz.startSession();
                session.startTransaction();
                try {
                    // Use bulk insert operation for better performance
                    await Quiz.insertMany(defaultQuestions);
                    await session.commitTransaction();
                } catch (error) {
                    await session.abortTransaction();
                    throw error;
                } finally {
                    session.endSession();
                }

                // Update the cached questions
                cachedQuestions = defaultQuestions;
            }
        }

        res.json(cachedQuestions);
    } catch (error) {
        console.error('Error fetching quiz data:', error);
        res.status(500).json({ error: 'Failed to fetch quiz data' });
    }
});

app.post('/api/addQuestion', async (req, res) => {
  const newQuestion = req.body;
  try {
      const createdQuestion = await Quiz.create(newQuestion);
      res.status(201).json(createdQuestion);
  } catch (error) {
      console.error('Error adding question:', error);
      res.status(500).json({ error: 'Failed to add question' });
  }
});

// // Define route to add a business location
// app.post('/api/businesslocations', async (req, res) => {
//   try {
//     const { _id, name, lat, lng } = req.body;

//     // Validate input data
//     if (!_id || !name || !lat || !lng) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Create a new business location document
//     const newLocation = new BusinessLocation({
//       _id,
//       name,
//       lat,
//       lng
//     });

//     // Save the new location document to the database
//     await newLocation.save();

//     res.status(201).json({ message: 'Location added successfully', location: newLocation });
//   } catch (error) {
//     console.error('Error adding location:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Define route to delete a business location
// app.delete('/api/businesslocations/:locationId', async (req, res) => {
//   try {
//     const locationId = req.params.locationId;

//     // Find and delete the business location by its ID
//     await BusinessLocation.findByIdAndDelete(locationId);

//     res.status(200).json({ message: 'Location deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting location:', error);
//     res.status(500).json({ message: error.message });
//   }
// });

// // Function to get business locations from MongoDB
// const getBusinessLocations = async (req, res) => {
//   try {
//     // Find all business locations in the database
//     const locations = await BusinessLocation.find();
//     res.status(200).json(locations);
//   } catch (error) {
//     console.error('Failed to fetch locations:', error);
//     res.status(500).json({ message: error.message });
//   }
// };


// After Optimisation
//Route for adding job locations
  // Define route to get business locations
  app.get('/api/businesslocations', (req, res) => {
    getBusinessLocations(req, res);
  });
  
  app.post('/api/businesslocations', (req, res) => {
    console.log('adding')
    addBusinessLocation(req, res);
  });
  
  // Define route to delete a business location
  app.delete('/api/businesslocations/:locationId', (req, res) => {
    deleteBusinessLocation(req, res);
  });
  
  // Function to get business locations from MongoDB

  const getBusinessLocations = async (req, res) => {
    try {
      // Find all business locations in the database
      const locations = await BusinessLocation.find();
      res.status(200).json(locations);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
      res.status(500).json({ message: error.message });
    }
  };
  
 // Function to add a business location to MongoDB
const addBusinessLocation = async (req, res) => {
  const { _id,name, lat, lng } = req.body;

  try {
    // Create a new business location document
    const newLocation = new BusinessLocation({
      _id,
      name,
      lat,
      lng
    });

    // Save the new location document to the database
    await newLocation.save();
    console.log('hello')
    res.status(201).json({ message: "Location added successfully", location: newLocation });
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(500).json({ message: error.message });
  }
};

// Function to delete a business location from MongoDB
const deleteBusinessLocation = async (req, res) => {
  const locationId = req.params.locationId;

  try {
    // Find the location by ID and delete it
    const deletedLocation = await BusinessLocation.findOneAndDelete({ _id: locationId });

    if (deletedLocation) {
      res.status(200).json({ message: "Location deleted successfully" });
    } else {
      res.status(404).json({ message: "Location not found or delete failed" });
    }
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).json({ message: error.message });
  }
};
//save testresults to database
app.post('/api/storeResults', (req, res) => {
  const { useremail, score, totalscore } = req.body;

  const newQuizResult = new QuizResult({
      useremail,
      score,
      totalscore
  });

  newQuizResult.save()
      .then(() => {
          console.log('Quiz result stored:', newQuizResult);
          res.sendStatus(200);
      })
      .catch(err => {
          console.error('Error storing quiz result:', err);
          res.status(500).send('Internal Server Error');
      });
});
app.get('/api/testResults', async (req, res) => {
  try {
      // Retrieve all quiz results from the database
      const results = await QuizResult.find();
      res.json(results);
  } catch (error) {
      console.error('Error fetching quiz results:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/checkUserTest/:enteredUsername', async (req, res) => {
  const {enteredUsername}=req.params;
  const username = enteredUsername;

  try {
    // Check if the user's email exists in the quizresults collection
    const result = await QuizResult.findOne({ useremail: username });
    console.log(result)
    // Send response based on whether the user's email exists
    res.json({ exists: !!result }); // Send true if result exists, false if not
} catch (error) {
    console.error('Error checking user test:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

// app.post('/api/addjobs', async (req, res) => {
//   try {
//     // Extract job details from the request body
//     const { title, description, category, country, city, location, salaryFrom, salaryTo, fixedSalary } = req.body;

//     // Validate input data
//     if (!title || !description || !category || !country || !city || !location || salaryFrom === undefined || salaryTo === undefined || fixedSalary === undefined) {
//       return res.status(400).json({ error: 'Missing required fields' });
//     }

//     // Create a new job document using the JobModel schema
//     const newJob = new Job({
//       title,
//       description,
//       category,
//       country,
//       city,
//       location,
//       salaryFrom,
//       salaryTo,
//       fixedSalary
//     });

//     // Save the new job document to the database
//     await newJob.save();

//     // Send a success response
//     res.status(201).json({ message: 'Job added successfully', job: newJob });
//   } catch (error) {
//     // Handle any errors that occur during job creation
//     console.error('Error adding job:', error);
//     res.status(500).json({ error: 'Failed to add job' });
//   }
// });

// After Optimisation
// Define a route for adding jobs by admin
app.post('/api/addjobs', async (req, res) => {
  try {
    // Extract job details from the request body
    const { title, description, category, country, city, location, salaryFrom, salaryTo, fixedSalary } = req.body;

    // Create a new job document using the JobModel schema
    const newJob = new Job({
      title,
      description,
      category,
      country,
      city,
      location,
      salaryFrom,
      salaryTo,
      fixedSalary
    });

    // Save the new job document to the database
    await newJob.save();

    // Send a success response
    res.status(201).json({ message: 'Job added successfully', job: newJob });
  } catch (error) {
    // Handle any errors that occur during job creation
    console.error('Error adding job:', error);
    res.status(500).json({ error: 'Failed to add job' });
  }
});


app.get('/api/availablejobs',async(req,res)=>{
  try{
    const availablejobs=await Job.find().lean();
    res.json(availablejobs);
   }catch (err) {
    res.status(500).json({ error: err.message });
  }
})
app.get("/api/job/:id", async (req, res) => {
  const jobId = req.params.id;

  try {
    const job = await Job.findById(jobId);
    if (job) {
      res.json({ job });
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch job details" });
  }
});

// Define a route for deleting a job by ID
app.delete('/api/job/:id', async (req, res) => {
  const jobId = req.params.id;

  try {
    // Find the job by ID and delete it
    const deletedJob = await Job.findByIdAndDelete(jobId).lean();
    
    if (!deletedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
});
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
        text: `Your OTP is: ${otp2}`,
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

// After Database Optimization
app.post('/api/login', async (req, res,next) => {
  
  try {
    console.log('Username:', req.session.userName);
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email});

    if (!user || user.password !== password) {
      console.log('hello');
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // const token = generateToken(user);
    // req.session.token = token;
    // req.session.userName = user.username; 
    // temp = user.username;
    // console.log('Username set in session:', req.session); // Add this line to debug


    // res.cookie('token', token, { httpOnly: true });
    const token = generateToken(user);
    req.session.token = token;
    req.session.userName = user.username; 
    console.log('Username set in session:', req.session); // Debugging session

    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.post('/api/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate input data
//     if (!email || !password) {
//       return res.status(400).json({ error: 'Email and password are required' });
//     }

//     // Find user by email
//     const user = await UserModel.findOne({ email });

//     // Check if user exists and password is correct
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

//     // Set token in session (if needed)
//     // req.session.token = token;
//     // req.session.userName = user.username;

//     // Set cookie with token
//     res.cookie('token', token, { httpOnly: true });

//     // Send success response
//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


const specs=swaggerJSDoc(swaggerOptions);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs));
