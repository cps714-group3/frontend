import React from 'react';
import dumpsterFireLogo from '../../images/dumpsterfire.png';
import './LandingNav.css';

export const LandingNav = () => {

    return (
        <div className="container">
            <div className="logo">
                <a href="/"><img src={dumpsterFireLogo} alt="Dumpster Fire Logo"/></a>
            </div>
            <h1 className="active" id="projectTitle">Dumpster Fire</h1>
            <div className="nav-area">
                <ul className="nav">
                    <li><a href="#visual" className="down">Home</a></li>
                    <li><a href="#features" className="down">Features</a></li>
                    <li><a href="#faq" className="down">FAQ</a></li>
                </ul>
                <ul className="buttons">
                    <li><a href="/login" className="btn">Login/Sign up</a></li>
                </ul>
            </div>
        </div>
    );
};

