import '../css/Company.css';
import { Link } from 'react-router-dom';

import adobeImage1 from '../imgANDvid/images/img-adobe.jpeg';
import adobeImage2 from '../imgANDvid/images/img-adobe2.jpeg';
import adobeImage3 from '../imgANDvid/images/img-adobe3.jpeg';
import amazonImage1 from '../imgANDvid/images/img-amazon.jpeg';
import amazonImage2 from '../imgANDvid/images/img-amazon2.jpeg';
import amazonImage3 from '../imgANDvid/images/img-amazon3.jpeg';
import microsoftImage1 from '../imgANDvid/images/img-microsoft.jpg';
import microsoftImage2 from '../imgANDvid/images/img-microsoft2.jpeg';
import microsoftImage3 from '../imgANDvid/images/img-microsoft3.jpeg';
import ibmImage1 from '../imgANDvid/images/img-ibm.jpeg';
import ibmImage2 from '../imgANDvid/images/img-ibm2.jpeg';
import ibmImage3 from '../imgANDvid/images/img-ibm3.jpeg';
import infosysImage1 from '../imgANDvid/images/img-infosys.jpeg';
import infosysImage2 from '../imgANDvid/images/img-infosys2.jpeg';
import infosysImage3 from '../imgANDvid/images/img-infosys3.jpeg';
import orImage1 from '../imgANDvid/images/img-oracle.jpeg';
import orImage2 from '../imgANDvid/images/img-oracle2.jpeg';
import orImage3 from '../imgANDvid/images/img-oracle3.jpeg';
import accImage1 from '../imgANDvid/images/img-accenture.jpeg';
import accImage2 from '../imgANDvid/images/img-accenture2.jpeg';
import accImage3 from '../imgANDvid/images/img-accenture3.jpeg';
import delImage1 from '../imgANDvid/images/img-delloite.jpeg';
import delImage2 from '../imgANDvid/images/img-delloite2.jpeg';
import delImage3 from '../imgANDvid/images/img-delloite3.jpeg';

const Company = ({ company }) => {
    let companyName = '';
    let backgroundimage_1 = '';
    let backgroundimage_2 = '';
    let backgroundimage_3 = '';

    // Setting company-specific details based on the 'company' prop
    switch (company) {
        case 'Adobe':
            companyName = 'ADOBE';
            backgroundimage_1 = adobeImage1;

            backgroundimage_2 = adobeImage2;
            backgroundimage_3 = adobeImage3;

            break;
        case 'Amazon':
            companyName = 'AMAZON';
            backgroundimage_1 = amazonImage1;
            backgroundimage_2 = amazonImage2;
            backgroundimage_3 = amazonImage3;

            break;
        case 'Microsoft':
            companyName = 'MICROSOFT';
            backgroundimage_1 = microsoftImage1;
            backgroundimage_2 = microsoftImage2;
            backgroundimage_3 = microsoftImage3;

            break;
        case 'IBM':
            companyName = 'IBM';
            backgroundimage_1 = ibmImage1;
            backgroundimage_2 = ibmImage2;
            backgroundimage_3 = ibmImage3;

            break;
       
        case 'Oracle':
            companyName = 'ORACLE';
            backgroundimage_1 = orImage1;
            backgroundimage_2 = orImage2;
            backgroundimage_3 = orImage3;

            break;
        case 'Infosys':
            companyName = 'INFOSYS';
            backgroundimage_1 = infosysImage1;
            backgroundimage_2 = infosysImage2;
            backgroundimage_3 = infosysImage3;

            break;
        case 'Accenture':
            companyName = 'ACCENTURE';
            backgroundimage_1 = accImage1;
            backgroundimage_2 = accImage2;
            backgroundimage_3 = accImage3;
            break;
            case 'Deloitte':
                companyName = 'DELOITTE';
                backgroundimage_1 = delImage1;
                backgroundimage_2 = delImage2;
                backgroundimage_3 = delImage3;
    
                break;
           

        default:
            break;
    }


    return (
        <div>
        <div className='companybg'>
            <div className="head" >
                <h1>{companyName}</h1>
            </div>
            <div className="img">

            </div>
            <section className="company-container" >
                <div className="card" >
                    <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                        <img
                            src={backgroundimage_1}
                            alt="pp"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <div  ></div>
                    <h2>About {companyName}:</h2>
                    <p>{companyName} is one of the leading tech companies that develops market software and hardware that deliver
                        new opportunities, greater convenience, and enhanced value to people's lives.
                        {companyName} is the industry leader in desktop operating systems, with a 75% market.</p>
                    <Link to="">Explore</Link>
                </div>
                <div className="card" >

                    <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                        <img
                            src={backgroundimage_2}
                            alt="pp"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <div>

                        <h2>Collaboration with us:</h2>
                        <p>Its been a five years of a healthy relationship between us and {companyName} Team. We are glad that we are able
                            to deliver quality and skillful graduates to the Company when they are in need of a graduate in a
                            particular field.</p>
                        <Link to="">Explore</Link>
                    </div>
                </div>
                <div className="card">
                    <div style={{ width: '200px', height: '200px', overflow: 'hidden' }}>
                        <img
                            src={backgroundimage_3}
                            alt="pp"
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <div className="card-img "></div>
                    <h2>{companyName}'s Review on us:</h2>
                    <p>We are very glad to say that "Graduates-World" organizations have provided us very skillful graduates.
                        They have decreased our work in hiring by giving ratings to graduates according to their performance in
                        a three-layer test, which is very genuine.</p>
                    <Link to="">Explore</Link>
                </div>
            </section>
        </div>
        </div>
    );
}

export default Company;