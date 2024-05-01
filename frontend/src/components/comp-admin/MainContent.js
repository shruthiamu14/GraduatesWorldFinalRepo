// MainContent.js
import React from 'react';
import '../../css/Admindashboard.css'
const MainContent = ({ title }) => {
  return (
    <div className="main-content">
      {/* Add other content as needed */}   

      <div class="maincontentdb">
           
            <div class="adtitle">ADMIN DETAILS</div>
            <div class="mainadmin-boxes">

            <div className="admin-item">
            <img className='adminimg'src={require('../../imgANDvid/images/man1.jpg')} width="18px" alt="Admin" />
            </div>

            <div className="admin-item">
            <img className='adminimg' src={require('../../imgANDvid/images/man2.jpg')} width="56%" alt="Admin" />
            </div>


            </div> <br/>

            <div class="mainadmin-boxes-2">

                <div class="admin-left-2">
                    <br/>
                    <div class="admin-item">Admin-1</div>
                    <div class="admin-item">
                        <ul>
                            <li className='mainadminli'>Name: Vikas</li>
                            <li className='mainadminli'>mail:vikasvarasala@gmail.com</li>
                            <li className='mainadminli'>Contact: 9999888877</li>
                        </ul>

                    </div>
                </div>
                <div class="admin-right-2">
                    <br/>
                    <div>Admin-2</div>

                    <div>
                        <ul>
                            <li className='mainadminli'>Name: Rakesh</li>
                            <li className='mainadminli'>mail:Rakesh546@gmail.com</li>
                            <li className='mainadminli'>Contact: 6666888877</li>
                        </ul>
                    </div>


                </div>
              </div>  
        </div>
    </div>

    
  );
};



export default MainContent;
