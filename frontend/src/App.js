
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom/dist/umd/react-router-dom.development';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import Portfolios from './components/Portfolios';
import Company from './components/Company';
import Computerscience from './components/Computerscience';
import Jobdetails from './components/Jobdetails';
import Registerform from './components/RegisterForm';
import UserLogin from './components/UserLogin';
import ExpertLogin from './components/ExpertLogin.js';
import AdminLogin from './components/AdminLogin';
import BecomeExpertForm from './components/BecomeExpertForm.js';
import ContactUs from './components/Contactabout.js';
import OTPForm from './components/OTPForm.js';
import OTPForm1 from './components/OTPForm1.js';
import ThankYouPage from './components/Thankyoupage.js';
import ForgotLogin from './components/ForgetLogin.js'
import UpdatePass from './components/UpdatePass.js';
import Userdashboard from './components/Userdashboard.js';
import Admindashboard from './components/Admindashboard.js';
import Expertdashboard from './components/Expertdashboard.js'
import ExpertForgot from './components/ExpertForgot.js'
import OTPForm2 from './components/OTPForm2.js';
import ExpertPassUpdate from './components/ExpertPassUpdate.js'
import ThankTestPage from './components/comp-user/thankstestpage.js';
import AvailableJobDetails from './components/comp-user/AvailableJobDetails.js';
import MyJobs from './components/comp-admin/MyJobs.js';

import Quiz from './components/comp-user/Quiz.js';
import Result from './components/comp-user/TestResults.js';

function App() {

  return (
    <div>
 <Router>
      <Routes>
        {/* Conditionally render Navbar for routes other than /register */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/footer" element={<Footer />} />
                <Route path="/Portfolios" element={<Portfolios />} />
                <Route path="/adobe" element={<Company company="Adobe" />} />
                <Route path="/amazon" element={<Company company="Amazon" />} />
                <Route path="/microsoft" element={<Company company="Microsoft" />} />
                <Route path="/ibm" element={<Company company="IBM" />} />
                <Route path="/oracle" element={<Company company="Oracle" />} />
                <Route path="/infosys" element={<Company company="Infosys" />} />
                <Route path="/accenture" element={<Company company="Accenture" />} />
                <Route path="/deloitte" element={<Company company="Deloitte" />} />
                <Route path="/Computerscience" element={<Computerscience />} />
                <Route path="/jobs/:id" element={<Jobdetails />} />
                <Route path="/contactabout" element={<ContactUs />} />
                
              </Routes>
            </>
          }
        />
        {/* Route for /register without Navbar */}
        <Route path="/register" element={<Registerform />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/expertlogin" element={<ExpertLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/expPersonalinfo" element={<BecomeExpertForm />} />
        <Route path="/otp" element={<OTPForm/>}/>
        <Route path="/otp1" element={<OTPForm1/>}/>
        <Route path="/thankyou" element={<ThankYouPage/>}/>
        <Route path="/thankstestpage" element={<ThankTestPage/>}/>
        <Route path="/r" element={<ForgotLogin/>}/>
        <Route path="/updatepass" element={<UpdatePass/>}/>
        <Route path="/userdashboard" element={<Userdashboard />} />
        <Route path="/job/:id" element={<AvailableJobDetails/>} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path="/expertdashboard" element={<Expertdashboard />} />
        <Route path="/expertforgot" element={<ExpertForgot/>} />
        <Route path="/otp2" element={<OTPForm2/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/result" element={<Result />}/>
      
        <Route path="/expertupdatepass" element={<ExpertPassUpdate/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
