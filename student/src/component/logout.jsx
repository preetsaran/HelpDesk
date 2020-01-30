import React, { Component, StrictMode } from 'react';
import { Link,Redirect } from "react-router-dom";
class Logout extends Component {
    constructor(props){
        super(props)
        localStorage.removeItem("Token");
       
    }
    
    render() {
        return ( 
            <React.Fragment>
                {  alert("  logged Out successfully ") }
                <Redirect to="/"></Redirect>
                {/* {window.location.replace("/")} */}
            </React.Fragment>
         );
    }
}
 
export default Logout;