import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faTwitter, faInstagram} from '@fortawesome/free-brands-svg-icons'

const Footer = () =>{
    return(
        <footer className="footer-section">
            <div className="footer-divicion">
            <div className="footer-section-option footer-text">
                <div>
                    <span>Cochabamba - Bolivia</span>
                </div>
                <div>
                    <span>Av. America entre pando y potosi</span>
                </div>
                <div>
                    <span>HORARIO</span>
                </div>
            </div>
            <div className="footer-section-option-center">
                <div>
                    <span>START AMERICAS TOGETHER </span>
                </div>
            </div>
            <div className="footer-section-option-icon icons">
                <FontAwesomeIcon icon={faFacebook}/>
            </div>
            <div className="footer-section-option-icon icons">
                <FontAwesomeIcon icon={faTwitter}/>
            </div>
            <div className="footer-section-option-icon icons">
                <FontAwesomeIcon icon={faInstagram}/>
            </div>
            </div>
        </footer>
    )
}

export default Footer;
