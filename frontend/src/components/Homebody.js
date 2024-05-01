

import '../css/Home.css'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
const Homebody = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(1);

  const handleNavButtonClick = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };

  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const jobSelect = () => {
    switch (document.getElementById('selectfields').value) {
      case 'ComputerScience':
        console.log('hii')
        navigate('/Computerscience');
        break;
      case 'Electronics':
        navigate('/electronics');
        break;
        default:
          break;
    }
  };

  return (
    <div>
      <section className="home">
        <video className={`video-slide ${currentSlide === 1 ? 'active' : ''}`} src={require("../imgANDvid/videos/video5.mp4")} autoPlay muted loop></video>
        <video className={`video-slide ${currentSlide === 2 ? 'active' : ''}`} src={require("../imgANDvid/videos/video6.mp4")} autoPlay muted loop></video>
        <video className={`video-slide ${currentSlide === 3 ? 'active' : ''}`} src={require("../imgANDvid/videos/video1.mp4")} autoPlay muted loop></video>
        <video className={`video-slide ${currentSlide === 4 ? 'active' : ''}`} src={require("../imgANDvid/videos/video2.mp4")} autoPlay muted loop></video>
        <div className={`content ${currentSlide === 1 ? 'active' : ''}`}>
          <h1>
            <span className="letter lettercol">G</span>
            <span className="letter lettercol">r</span>
            <span className="letter lettercol">a</span>
            <span className="letter lettercol">d</span>
            <span className="letter lettercol">u</span>
            <span className="letter lettercol">a</span>
            <span className="letter lettercol">t</span>
            <span className="letter lettercol">e</span>
            <span className="letter lettercol">s</span>
            <span className="letter">W</span>
            <span className="letter">o</span>
            <span className="letter">r</span>
            <span className="letter">l</span>
            <span className="letter">d</span>
          </h1>

          <p>--Your future is our concern--</p>
          <button onClick={() => navigate('/home#fscroll')} className="hover-btn">Explore</button>
        </div>

        <div className={`content ${currentSlide === 2 ? 'active' : ''}`}>
          <h1>
            Searching for a <span>Job?</span>
          </h1>
          <p>--High Profilied Jobs</p>
          <button className="button" id="myBtn" onClick={togglePopup}>
            Click Here
          </button>

          {isPopupVisible && (
            <div>
              
    
            <div className="pop-up">
            <button className="close" onClick={togglePopup} >&times;</button>
              <div className="info">
                <h2>Get Your Dream JOB</h2>
                <p>Your Future Is Here</p>
                <img
                  src={require('../imgANDvid/images/popupimage.png')}
                  alt=""
                  style={{ height: '30%', width: '40%' }}
                />
              </div>

              <div className="signupForm" name="signupform">
                <h2>Fill The Below</h2>
                <ul className="noBullet">
                  <li>
                    <br />
                    <br />
                    <label htmlFor="password">Are You A Graduate??</label><br/>
                    <select type="password" className="inputFields" id="password" name="password">
                    <option  value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                  </li>

                  <li/>
                <li/>
                  <br/>

                  <label htmlFor="selectfields">Choose Your Interested Fields</label><br/>
                  <select className="inputFields" id="selectfields" name="username">
                    <option value="ComputerScience" id="cs">Computer Science</option>
                    <option value="Electronics" id="ec">Electronics</option>
                  </select>

                </ul>
                <li id="center-btn">
                <button id="seeresults-btn" onClick={jobSelect}>SEE RESULTS</button>
               

              </li>
              </div>
              </div>
            
            </div>

          )}
        </div>
        <div className={`content ${currentSlide === 3 ? 'active' : ''}`}>
          <div>
      <h1>To become a <span>Expert</span></h1>
      <p>Experts in our website should have very high level of expereince with top most skills.Any how our team will
        going to decide as their requirment.If you think you have such qualification and intrest please follow us.</p>
      
      <button onClick={() => navigate('/expPersonalinfo')} className="hover-btn">Explore</button>

    
      </div>
    </div>

    <div className={`content ${currentSlide === 4 ? 'active' : ''}`}>
      <div>
      <h1>Our <span>Excellence</span></h1>
      <p>--Many users hired in their dream companies through our website,their details and our ratings are below--</p>
      <button onClick={() => navigate('/Portfolios')} className="hover-btn">Explore</button>
      </div>
    </div>

        <div>
          <div className="nav-btn active"></div>
          <div className="nav-btn"></div>
          <div className="nav-btn"></div>
          <div className="nav-btn"></div>
        </div>
        <div className="slider-navigation">
          <div
            className={`nav-btn ${currentSlide === 1 ? 'active' : ''}`}
            onClick={() => handleNavButtonClick(1)}
          ></div>
          <div
            className={`nav-btn ${currentSlide === 2 ? 'active' : ''}`}
            onClick={() => handleNavButtonClick(2)}
          ></div>
          <div
            className={`nav-btn ${currentSlide === 3 ? 'active' : ''}`}
            onClick={() => handleNavButtonClick(3)}
          ></div>
          <div
            className={`nav-btn ${currentSlide === 4 ? 'active' : ''}`}
            onClick={() => handleNavButtonClick(4)}
          ></div>
        </div>


      </section>


    </div>
  );
}

export default Homebody;