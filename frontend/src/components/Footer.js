import { Link } from "react-router-dom";
import '../css/Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
    return ( 
        <div >
           
            <footer className="footer">
      <div className="container1" id="footer">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li><Link to="/contactabout#toabout">about us</Link></li>
              <li><Link to="/contactabout">contact us</Link></li>
              <li><Link to="#">privacy policy</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>get help</h4>
            <ul>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#ourcollab">our collaborations</Link></li>
              <li><Link to="/login">login</Link></li>
              <li><Link to="/register">sign up</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>who can use</h4>
            <ul>
              <li><Link to="#">User</Link></li>
              <li><Link to="#">expert</Link></li>
              <li><Link to="#">admin</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <Link to="#"><i className="fab fa-facebook-f"></i></Link>
              <Link to="#"><i className="fab fa-twitter"></i></Link>
              <Link to="#"><i className="fab fa-instagram"></i></Link>
              <Link to="#"><i className="fab fa-linkedin-in"></i></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
                
           
        </div>
     );
}
 
export default Footer;