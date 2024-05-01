import React from 'react';
import '../css/Contactabout.css';

const ContactUs = () => {
  return (
<div className='ctbody'>
    <div className='contactabout'>
      <h1 className='ctname'>Contact-About</h1>

      <div className="ctapp-container">
        <div className="ctabout-container">
          <h2 className='cthead2'>About Us</h2>
          <p>
            Graduates World:

            Graduates World is an Indian employement website which acts as an Interface between graduates and top
            most MNC Companies.
                <pre>  </pre>
            This is the first Employement Website which offers three layer Skill based test to graduates who are
            willing to find jobs in top most MNC Companies. These Skill-based tests are taken by experts who are
            hired by us by observing their experience and by testing their skills in their field of work.

            The First layer of test will be some type Quiz in online mode
            The Second Layer of test will be video-conferencing in online mode
            The Third Layer of test will be Interview in Offline mode
          </p>

        </div>

        <div className="contact-container">
          <h2>Contact Us</h2>
          <form className='ctform'>
            <label htmlFor="name" className='ctlabel'>Name:</label>
            <input type="text" id="name" name="name" className='ctinput' />

            <label htmlFor="email" className='ctlabel'>Email:</label>
            <input type="email" id="email" name="email"  className='ctinput'/>

            <label htmlFor="message" className='ctlabel'>Message:</label>
            <textarea id="message" name="message" className='cttextarea'></textarea>

            <button type="submit" className='ctbutton'>Send</button>
          </form>
        </div>
      </div>
    </div>
    </div>
      );
};

export default ContactUs;