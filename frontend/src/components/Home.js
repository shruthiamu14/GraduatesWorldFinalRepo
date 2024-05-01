import Homebody from "./Homebody";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom/dist/umd/react-router-dom.development";
import Footer from "./Footer";
const Home = () => {

  const hiSectionRef = useRef(null);
  const footersectionRef=useRef(null);
  const location = useLocation();


  useEffect(() => {
    // Scroll to the 'hi' section when the component mounts
    if (location.hash === '#hi' && hiSectionRef.current) {
      hiSectionRef.current.scrollIntoView({ top: 700, behavior: 'smooth' });
    }
    else if(location.hash === '#fscroll' && footersectionRef.current){
    footersectionRef.current.scrollIntoView({ top: 1500, behavior: 'smooth' });
    }
    
  }, [hiSectionRef,footersectionRef, location]);

  return (
    <div  >
      <Homebody />
      <div id="hi" ref={hiSectionRef}>
        <div className="ourc" id="ourcollab">
          <h1>Our Collaborations</h1>
        </div>
        <section className="container">
          <Link to="/adobe" className="panel">
            <div className="panel" style={{ backgroundImage: `url(${require('../imgANDvid/images/img-adobe.jpeg')})` }}>
              <h3>Adobe</h3>
            </div>
          </Link>
          <Link to="/amazon" className="panel">
            <div className="panel" style={{ backgroundImage: `url(${require('../imgANDvid/images/img-amazon.jpeg')})` }}>
              <h3>Amazon</h3>
            </div>
          </Link>
          <Link to="/microsoft" className="panel">
            <div className="panel" style={{ backgroundImage: `url(${require('../imgANDvid/images/img-microsoft.jpg')})` }}>
              <h3>Microsoft</h3>
            </div>
          </Link>
          <Link to="/ibm" className="panel">
            <div className="panel" style={{ backgroundImage: `url(${require('../imgANDvid/images/img-ibm.jpeg')})` }}>
              <h3>IBM</h3>
            </div>
          </Link>
          <Link to="/infosys" className="panel">
            <div className="panel" style={{ backgroundImage: `url(${require('../imgANDvid/images/img-infosys.jpeg')})` }}>
              <h3>Infosys</h3>
            </div>
          </Link>
          <Link to="/oracle" className="panel">
            <div className="panel" style={{ backgroundImage: `url(${require('../imgANDvid/images/img-oracle.jpeg')})` }}>
              <h3>Oracle</h3>
            </div>
          </Link>
          <Link to="/accenture" className="panel">
            <div className="panel" style={{ backgroundImage: `url(${require('../imgANDvid/images/img-accenture.jpeg')})` }}>
              <h3>Accenture</h3>
            </div>
          </Link>
          <Link to="/deloitte" className="panel">
            <div className="panel" style={{ backgroundImage: `url(${require('../imgANDvid/images/img-delloite.jpeg')})` }}>
              <h3>Deloitte</h3>
            </div>
          </Link>
        </section>


      </div>
      <div>
        <div id="fscroll" ref={footersectionRef}></div>
      <Footer/>
      </div>
    </div>
  );
}

export default Home;