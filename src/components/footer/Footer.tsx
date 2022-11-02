import React from 'react';
import { LandingFooter } from './SubFooter';

export const Footer = () => {
    return (
        <footer id='footer'>
            <div className='container flex'>
                <div className='left-col'>
                    <div className='col'>
                        <span className='title'>Navigation</span>
                        <ul>
                            <li>
                                <a href='#visual'>Home</a>
                            </li>
                            <li>
                                <a href='#features'>Features</a>
                            </li>
                            <li>
                                <a href='#faq'>FAQ</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col'>
                        <span className='title'>Resources</span>
                        <ul>
                            <li>
                                <a href='#visual'>Privacy Policy</a>
                            </li>
                            <li>
                                <a href='#visual'>Terms & Conditions</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='right-col'>
                    <span className='title'>Start using Dumpster Fire now!</span>
                    <a href='/signup' className='btn has-arrow'>
                        Sign up <i className='icon-arrow-right1'></i>
                    </a>
                </div>
            </div>
            <LandingFooter />
        </footer>
    );
};
