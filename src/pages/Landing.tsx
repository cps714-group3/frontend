import React from 'react';
import './Landing.css';
import { LandingNav } from '../components/landing/LandingNav';
import { LandingFooter } from '../components/landing/LandingFooter';
import { LandingFAQ } from '../components/landing/LandingFAQ';
import demo from '../images/demoPage.png';
import demo2 from '../images/dashboard.png';
import demo3 from '../images/reports.png';
export const Landing = () => {

    return (
            <div id="wrapper">
                <header id="header">
                    <LandingNav />
                </header>
            <main id="main">
                <section className="visual" id="visual">
                    <div className="textblock">
                        <div className="text">
                            <h1>Disaster prevention. Leading software management solution</h1>
                            <p>Your all in one project management tool.</p>
                            <a href="/login" className="btn has-arrow">Login / Sign up <i className="icon-arrow-right1"></i></a>
                        </div>
                    </div>
                    <div className="img">
                        <img src={demo} alt="Kanban Board"/>
                    </div>
                    <a href="#features" className="scroll-down down"><span className="mouse"><span className="scroll icon-arrow-down"></span></span>See our features</a>
                </section>
            
                <section className="three-cols" id="features">
                    <div className="container">
                        <div className="col">
                            <div className="img">
                                <img src={demo2} alt="Dashboard"/>
                            </div>
                            <h2>Beautiful and Intuitive Dashboard</h2>
                            <p>See all the information that is relevant to you at a glance.</p>
                        </div>
                        <div className="col">
                            <div className="img">
                                <img src={demo} alt="Kanban Board"/>
                            </div>
                            <h2>View Ongoing and Completed Tasks</h2>
                            <p>Sort issues and requirements based on their stage of development. Prioritize tasks and move them around by dragging individual cards.</p>
                        </div>
                        <div className="col">
                            <div className="img">
                                <img src={demo3} alt="Reports page"/>
                            </div>
                            <h2>Easily Upload and View Important Documents</h2>
                            <p>Stay organized and up to date with necessary documents and reports available at your fingertips.</p>
                        </div>
                    </div>
                </section>
                <section className="two-cols" id="faq">
                    <div className="container">
                        <div className="col">
                            <h2>Accelerate the development of your project now!</h2>
                            <p>Dumpster Fire enables teams to maximize the efficiency and organization of their project. No matter how big or small your team, our wide array of tools will
                                help you and your team thrive.</p>
                            <a href="/login" className="btn has-arrow">Sign up today<i className="icon-arrow-right1"></i></a>
                        </div>
                        <div className="col">
                            <LandingFAQ/>
                        </div>
                    </div>
                </section> 
                
            
            </main>
                <footer id="footer">
                    <div className="container flex">
                        <div className="left-col">
                            <div className="col">
                                <span className="title">Navigation</span>
                                <ul>
                                    <li><a href="#visual">Home</a></li>
                                    <li><a href="#features">Features</a></li>
                                    <li><a href="#faq">FAQ</a></li>
                                </ul>
                            </div>
                            <div className="col">
                                <span className="title">Resources</span>
                                <ul>
                                    <li><a href="#visual">Privacy Policy</a></li>
                                    <li><a href="#visual">Terms & Conditions</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="right-col">
                            <span className="title">Start using Dumpster Fire now!</span>
                            <a href="/login" className="btn has-arrow">Sign up <i className="icon-arrow-right1"></i></a>
                        </div>
                    </div>
                    <div className="container footer-holder">
                        <LandingFooter/>
                    </div>
                </footer>
            </div>
        
    );
};
