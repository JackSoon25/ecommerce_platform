
// import the Navbar component
import Navbar from "./Navbar";

// import the components for the pages
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import RegisterPage from "./RegisterPage";

// imports for wouter 
import { Route, Switch } from "wouter";


export default function App() {



  return (<>
      {/* Navigation Bar */}
      <Navbar />

      {/* <Switch> is the part of that screen that changes 
      depending on the URL of the browser */}
      <Switch>
        <Route path="/" component = {HomePage} />
        <Route path="/products" component = {ProductPage} />
        <Route path="/register" component = {RegisterPage} />

      </Switch>

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; 2026 E-Shop. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}