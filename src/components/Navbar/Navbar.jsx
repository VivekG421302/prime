import React, { useState } from 'react'
import "./Navbar.css"

function Navbar() {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

    return (
        <nav className="navbar" id="navbar">
<div className="nav-content">
    {/* LOGO CROSS-FADE */}
    <div className={`logo-wrapper ${menuIsOpen ? 'active' : ''}`} style={{cursor: "pointer"}}>
        <img src="/favicon.svg" alt="Symbol" className="logo-symbol" id='nav_logo' style={{aspectRatio: "1/1"}}/>
        <img src="/Prime Logo.svg" alt="Full Logo" className="logo-full" id='nav_logo' style={{height: "16px"}}/>
    </div>
    
    {/* ICON CROSS-FADE */}
    <div className={`hamburger ${menuIsOpen ? 'active' : ''}`} onClick={toggleMenu} style={{cursor: "pointer"}}>
        <svg className="icon-menu" xmlns="http://www.w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
        <svg className="icon-close" xmlns="http://www.w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </div>
</div>


            {/* Links are placed AFTER nav-content so they can slide behind it */}
            <ul className={`nav-links ${menuIsOpen ? "open" : ""}`}>
                <li><a href="#home" onClick={toggleMenu}>Home</a></li>
                <li><a href="#about" onClick={toggleMenu}>Shop</a></li>
                <li><a href="#about" onClick={toggleMenu}>About</a></li>
                <li><a href="#about" onClick={toggleMenu}>Contact</a></li>
            </ul>
        </nav>
    );
}
export default Navbar;
