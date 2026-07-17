import { useState } from "react";
// Link is a new component that we will use to navigate between pages;
// useLocation is a hook that we will use to get the current URL of the browser
import { Link, useLocation } from 'wouter';

export default function Navbar() {
    
    // creae a new state variable for the componnet
    // useState(false) means the default for state is `false`
    const [showNavBar, setShowNavBar] = useState(false);
    // When useLocation is called, it will return an array of two items;
    // index 0 - the current location (aka URL) of the browser
    // index 1 - a function to change the current location of the browser
    // since only the first item is needed, we will use array destructuring to get it
    const [location] = useLocation();

    return (<>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">E-Shop</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => {
              setShowNavBar(!showNavBar)}
            }
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${showNavBar ? "show" : ""}`}  id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className={`nav-link ${location === '/' ? 'active' : ''}`} aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location === '/products' ? 'active' : ''}`} href="/products">Products</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location === '/register' ? 'active' : ''}`} href="/register">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </>)



}