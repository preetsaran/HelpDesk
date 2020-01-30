// import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Home from "./component/Home"
import Register from "./component/Register";
import login from "./component/login";
import logout from "./component/logout";
import LoggedIn from "./component/loggedIn";

import Nav from 'react-bootstrap/Nav';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
const LI = <Nav.Link as={Link} to="/login">Login</Nav.Link>;
const LO = <Nav.Link as={Link} to="/logout">Logout</Nav.Link>


class MyApp extends Component {
  constructor(props) {
    super(props)
    this.state = {loggedIn : true,Token:"",count:0}
     this.state.Token = localStorage.getItem("Token");
    if (this.state.Token == null) {
        this.state.loggedIn = false;
    }
  
  }

//   componentWillReceiveProps(){
//     if (this.state.loggedIn)
//     { 
//       return LO;
//     }
//     else
//     {
//       return LI;
//     }
// }
  changeToken = (value) => { 
    this.state.loggedIn=value
  }
  
  handleLogged = () => {
    if (this.state.loggedIn)
    { 
      return LO;
    }
    
    else
    {
      return LI;
    }

  }
 

  render() { 
    return (
      <React.Fragment>
       <Router>
          <Navbar bg="primary" variant="dark">
          <Navbar.Brand as={Link} to="/"> <img className="logo" alt="Transparent MDB Logo" id="animated-img1" alt=""/>DashBoard</Navbar.Brand>
              
               <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to={"/Register"}>Register</Nav.Link>
                    {this.handleLogged()}
                     
                     
                    </Nav>
                </Navbar.Collapse>
          </Navbar>

      <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/Register" component={Register} />
            <Route path="/login" component={login} />
            
           
            <Route path="/loggedIn" component={(props) => <LoggedIn changeToken={this.changeToken} {...props} ></LoggedIn>} />
                <Route path="/" component={logout} />
            
               
          </Switch>
          </Router>
        </React.Fragment>

     )
  }
}

export default MyApp;

