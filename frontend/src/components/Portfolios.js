import React from 'react';
import '../css/Portfolios.css';
import { Link } from 'react-router-dom';
const Portfolios = () => {
  return (
  <div className='portfoliobody'>
      {/* User 1 */}
      <div className="hero content">
        <div className="detel">
          <h1>I'M Gagan <span>Ram</span></h1>
          <pre>
            <p>Current Position         :-<span> Full Stack Developer</span></p>
            <p>Working at               :-<span> Microsoft</span></p>
            <p>Graduation               :-<span> Btech</span></p>
            <p>Rating for our website   :-<span> Such a great and sweet website I have ever seen(5/5)</span></p>

            <Link to="#">Download Information</Link>
          </pre>
        </div>
        <div className="animation-area">
          <ul className="box-area">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="images">
          <img src={require("../imgANDvid/images/shape10.png")} className="shape" alt="Shape" />
          <img src={require("../imgANDvid/images/img1.png")} className="photo" alt="Ph" />
        </div>
      </div>

      {/* User 2 */}
      <div className="hero">
        <div className="detel">
          <h1>I'M Sruthi <span>Ammu</span></h1>
          <pre>
            <p>Current Position         :-<span> Full Stack Developer</span></p>
            <p>Working at               :-<span> Adobe</span></p>
            <p>Graduation               :-<span> Btech,phd</span></p>
            <p>Rating for our website   :-<span> I have never seen a website like this(5/5)</span></p>

            <Link to="#">Download Information</Link>
          </pre>
        </div>
        <div className="images">
          <img src={require("../imgANDvid/images/shape10.png")} className="shape" alt="Shape" />
          <img src={require("../imgANDvid/images/imggirl4.png")} className="photo" alt="Ph" />
        </div>
      </div>

      {/* User 3 */}
      <div className="hero">
        <div className="detel">
          <h1>I'M Sri <span>Vikas</span></h1>
          <pre>
            <p>Current Position         :-<span> Full Stack Developer</span></p>
            <p>Working at               :-<span> Microsoft</span></p>
            <p>Graduation               :-<span> Btech</span></p>
            <p>Rating for our website   :-<span> Such great and sweet website I have ever seen(5/5)</span></p>
          </pre>
          <Link to="#">Download Information</Link>
        </div>
        <div className="images">
          <img src={require("../imgANDvid/images/shape10.png")} className="shape" alt="Shape" />
          <img src={require("../imgANDvid/images/img2.png")} className="photo" alt="Ph" />
        </div>
      </div>

      {/* User 4 */}
      <div className="hero">
        <div className="detel">
          <h1>I,M Rahul <span>Pramod</span></h1>
          <pre>
            <p>Current Position         :-<span> Full Stack Developer</span></p>
            <p>Working at               :-<span> Microsoft</span></p>
            <p>Graduation               :-<span> Btech</span></p>
            <p>Rating for our website   :-<span> Such great and sweet website I have ever seen(5/5)</span></p>
          </pre>
          <Link to="#">Download Information</Link>
        </div>
        <div className="images">
          <img src={require("../imgANDvid/images/shape10.png")} className="shape" alt="Shape" />
          <img src={require("../imgANDvid/images/img3.png")} className="photo" alt="Ph" />
        </div>
      </div>
      {/* User 5 */}
      <div className="hero">
        <div className="detel">
          <h1>I,M Shyam <span>Bhaskar</span></h1>
          <pre>
            <p>Current Position         :-<span> Full Stack Developer</span></p>
            <p>Working at               :-<span> Microsoft</span></p>
            <p>Graduation               :-<span> Btech</span></p>
            <p>Rating for our website   :-<span> Such great and sweet website I have ever seen(5/5)</span></p>
          </pre>
          <Link to="#">Download Information</Link>
        </div>
        <div className="images">
          <img src={require("../imgANDvid/images/shape10.png")} className="shape" alt="Shape" />
          <img src={require("../imgANDvid/images/image4.png")} className="photo" alt="Ph" />
        </div>
      </div>
    </div>
  );
};

export default Portfolios;