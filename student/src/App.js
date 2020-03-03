import React, { Component } from "react";
import "./App.css";
import Navbar from "react-bootstrap/Navbar";
import Admin from "./component/Admin";
import Register from "./component/Register";
import Login from "./component/login";
import Logout from "./component/logout";
import Info from "./component/info"
import LoggedIn from "./component/myProfile";
import Home from "./component/Home"
import Nav from "react-bootstrap/Nav"; 
import NotFound from './component/notFound'
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
const LI = (<Nav.Link as={Link} to="/login">Login</Nav.Link>);
const LO = (<Nav.Link as={Link} to="/logout">Logout</Nav.Link>);
var directoryPath = `C:/Users/saran-champakali/Desktop/Dashboard-master/server/public/uploads/`;

let MP;
let loggedUser='user';
class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: true, Token: "", userPath:`/user/`,userName:'user',flag:true};
    this.state.Token = localStorage.getItem("Token");
       
    if (this.state.Token == null)
      {
       this.state.loggedIn = false;
      }
  }

  handleHome = () => {
    if (this.state.userName === 'admin')
    {
      return <Nav.Link as={Link} to="/admin">Home</Nav.Link>;
    }

    else {
     return <Nav.Link as={Link} to="/">Home</Nav.Link>;
    }

  }

  changeToken = value => {
    this.setState({ loggedIn: value });
  };

  setUserPath = user => {
    this.setState({ userPath: `/user/` + `${user[0].Name}` });
    this.setState({ userName: user[0].Name })
  }


  handleRegister = () => {
    if (!this.state.loggedIn) {
      return  <Nav.Link as={Link} to={"/Register"}>Register</Nav.Link>
    }
   
  }
  
  handleLogged = () => {
    if (this.state.loggedIn) {
      return LO;
    } else {
      return LI;
    }
  };

  handleProfile = () => {
    if (this.state.loggedIn) {
      return MP;
    } 
  }

  render() {

    MP = (<Nav.Link as={Link} to={this.state.userPath}>My Profile</Nav.Link>);
    return (
      <React.Fragment>
        <Router>
          <Navbar bg="primary" variant="dark">
            <Navbar.Brand as={Link} to="/">
              {" "}
              HelpDesk
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                {this.handleHome()}
                {this.handleRegister()}
                {this.handleProfile()}
                {this.handleLogged()}
                
              </Nav>
            </Navbar.Collapse>
          </Navbar>

          <Switch>

            <Route exact path="/" component={Home} />

            <Route exact path="/admin" component={Admin} />
   
            <Route exact path="/info" component={Info} />
            
            <Route path="/Register" component={Register} />

            <Route path="/login" component={(props) => {
              return (
                <Login
                  changeToken={this.changeToken}
                  setUserPath={this.setUserPath}
                  {...props}
                  /> //conditional rendering
                );
              }}/>
              
            <Route path={this.state.userPath} component={(props) => {
              return(
                <LoggedIn/>
              )
            }
              } />
            
            <Route path='/download' component={NotFound} />

            <Route path="/" component={props => {
                return (
                  <Logout
                  changeToken={this.changeToken}
                  {...props}/> //conditional rendering
                );
            }} />
            
          </Switch>

        </Router>
      </React.Fragment>
    );
  }
}

export default MyApp;