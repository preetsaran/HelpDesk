import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
class Login extends Component {
  state = { Enrollment_Number: "", password: "", loggedIn: true ,user:'',admin:false};

  constructor(props) {
    super(props);
    const Token = localStorage.getItem("Token");
    if (Token == null) {
      this.state.loggedIn = false;
    }
  }


  handleEnrollment_Number = e => {
    e.preventDefault();
    this.setState({ Enrollment_Number: e.currentTarget.value });
  };


  
  handlePassword = e => {
    e.preventDefault();
    this.setState({ password: e.currentTarget.value });
  };



  Login = async e => {
    e.preventDefault();
    var authUser;
    try {
       authUser = await axios.get("course");
      let enroll;
      let pass;

      console.log(authUser);
      for (let i = 0; i < authUser.data.studentData.length; i++) {

        if (this.state.Enrollment_Number===authUser.data.studentData[i].Enrollment_Number && this.state.password === authUser.data.studentData[i].password)
        {
          enroll = authUser.data.studentData[i].Enrollment_Number;
          pass = authUser.data.studentData[i].password;
  
          console.log(typeof enroll);

          localStorage.setItem("Token", "MysecretPass");

          if (enroll === '111') {
            this.setState({admin:true})
          }
          this.setState({ loggedIn: true });  
          this.props.changeToken(true);

          let user = authUser.data.studentData.filter((student) => {
              return (  this.state.Enrollment_Number ===
                        student.Enrollment_Number &&
                        this.state.password === student.password)
          })
          let uStr = JSON.stringify(user);
          this.props.setUserPath(user);
          
          localStorage.setItem("user", uStr);

         
          
        }
      }

      if (!enroll || !pass) {
        alert("You have entered wrong details");
        }
        

    }
    catch (error) {
      console.log("not matched");
      console.log(error);
    }
  };



  render() {
    if (this.state.loggedIn) {
      if (this.state.admin)
      {
        console.log("admin is here")
        return <Redirect to="/admin"></Redirect>;
      }
      else
      {
        console.log("useris here")
        return <Redirect to="/"></Redirect>;
      }
      
    }

    return (
      <React.Fragment>  
        <form class="LoginForm">
        <p className="Login">LOGIN</p>
          <label class="labels">Enrollment Number</label>
          <input
            class="takeEnrollment_Number"
            type="text"
            value={this.state.Enrollment_Number}
            onChange={this.handleEnrollment_Number}
          />

          <label class="labels">Password</label>
          <input
            class="takePass"
            type="password"
            value={this.state.Password}
            onChange={this.handlePassword}
          />

          <button class="text-right submit" onClick={this.Login}>
            Login
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;