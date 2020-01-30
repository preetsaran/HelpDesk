import React, { Component } from 'react';
import axios from "axios";
import LoggedIn from "../component/loggedIn"
import { Link,Redirect } from "react-router-dom";    
class login extends Component {
    state={Enrollment_Number:"",password:"",loggedIn : true}
    
    constructor(props) {
        super(props)
        const Token = localStorage.getItem("Token");
        if (Token == null) {
            this.state.loggedIn = false;
        }
    }
   
    handleEnrollment_Number=(e)=>{
        e.preventDefault();
        this.setState({ Enrollment_Number: e.currentTarget.value })
    }

    handlePassword=(e)=>{
        e.preventDefault();
        this.setState({password:e.currentTarget.value})
    }

    Login=async(e)=>{
        e.preventDefault();
        var authUser = await axios.get("course");
      try
        {
            let enroll;
            let pass;
            for (let i = 0; i < authUser.data.studentData.length; i++) {
               
                if (this.state.Enrollment_Number === authUser.data.studentData[i].Enrollment_Number && this.state.password === authUser.data.studentData[i].password) {
                    enroll = authUser.data.studentData[i].Enrollment_Number;
                    pass = authUser.data.studentData[i].password;
                    localStorage.setItem("Token", "MysecretPass")
                    this.setState({ loggedIn: true })
                    break;
                }
            }
            
            if (!enroll || !pass)
            {
                alert("You have entered wrong details");
            }
        }
        catch (error) {
           console.log("not matched");
           console.log(error);
       }
    }
    

     render() { 
         if(this.state.loggedIn){
             return <Redirect to="/loggedIn"></Redirect>
            //  window.location.replace("/loggedIn");
            
         }

        return ( 
            <React.Fragment>
                <form class="LoginForm">
                <label class="labels">Enrollment_Number:</label>
                <input class="takeEnrollment_Number" type="text" value={this.state.Enrollment_Number} onChange={this.handleEnrollment_Number} />

                <label class="labels">Password:</label>
                <input class="takePass" type="text" value={this.state.Password} onChange={this.handlePassword} />

                <button class="text-right submit" onClick={this.Login}>Login</button>               
                </form>
            </React.Fragment>
         );
    }
}
 
export default login;