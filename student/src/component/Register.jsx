import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"


class Register extends Component {
    state = { name:"",course:"",Enrollment_Number:"",password:""}
    
  nameInput = (event) => {
    // console.log(event.currentTarget.value);
    event.preventDefault();
    this.setState({name:event.currentTarget.value})
  }

  handlePassword=(e)=>{
    e.preventDefault();
    // console.log(e.currentTarget.value)
    this.setState({password:e.currentTarget.value})
}

handleEnroll=(e)=>{
    e.preventDefault();
    // console.log(e.currentTarget.value)
    this.setState({Enrollment_Number:e.currentTarget.value})
  }
  
  courseInput = (event) => {
    this.setState({course:event.currentTarget.value})
  }

  Register = async (e) => {
    try {
      var myObj = {};
    e.preventDefault();
    myObj.Name   = this.state.name;
    myObj.course = this.state.course;
    myObj.Enrollment_Number = this.state.Enrollment_Number;
    myObj.password = this.state.password;
    // window.myObj = myObj;
      if (!myObj.Name) {
        alert("Name is required field")
      }
      else if (!myObj.course || myObj.course === "Select") {
        alert("Course is required field")
      }
      else if (!myObj.Enrollment_Number) {
        alert("Please enter your Enrollment number")
      }
      else if (!myObj.Enrollment_Number) {
        alert("Please enter your password")
      }
     
      else {
        var courseData = await axios.get("course");
      }

    let course=courseData.data.courseData.filter((obj) => {
      if (obj.courseName === myObj.course) {
        return obj._id
      }
    })
      
    myObj.courseID = course[0]._id;

    await axios.post("student", ({ student: myObj }));

    console.log("Axios request sent");
      this.setState({ course: "", age: "", name: "" });
    alert(`${myObj.Name} Registered Successfully`);
      window.location.replace("/"); 
      // return <Redirect to="/"></Redirect>
    }
    catch (error) {
      console.log(error);
    }
  }
  
  render() { 
      
        return ( 
          <React.Fragment>

  <form>
    <p className="h5 mb-4">REGISTER</p>
    <div class="form-group">
    <label for="exampleFormControlInput1">Name</label>
    <input type="text" class="form-control" 
      value={this.state.name} onChange={this.nameInput} />
              </div>
              

    <div class="form-group">
    <label for="exampleFormControlSelect1">Course</label>
    <select class="form-control" id="exampleFormControlSelect1"
      onChange={this.courseInput}>
      <option>Select</option>
      <option>Electrical Engineering</option>
      <option>Information Technology</option>
      <option>Mechanical Engineering</option>
      <option>Computer Science</option>
      <option>Power Engineering</option>
    </select>
              </div>
              
              <div class="form-group">
    <label for="exampleFormControlInput1">Enroll No.</label>
    <input type="text" class="form-control" 
      value={this.state.Enrollment_Number} onChange={this.handleEnroll} />
              </div>
                
              <div class="form-group">
    <label for="exampleFormControlInput1">Password</label>
    <input type="password" class="form-control"
      value={this.state.password} onChange={this.handlePassword}/>
              </div>

     

      <button type="submit" class="btn btn-register" onClick={this.Register} >Register</button>
</form>

            
</React.Fragment>
         );
    }
}
 
export default Register;