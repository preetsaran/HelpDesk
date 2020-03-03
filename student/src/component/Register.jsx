import React, { Component } from 'react';
import axios from "axios";
import Message from './Message';
import { Redirect } from "react-router-dom"


class Register extends Component {
    state = { name:"",course:"Select",Enrollment_Number:"",password:"",file:'',fileName:'',message:'',flag:false}
    
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

  handlePic = (event) => {
    // console.log(typeof event.target.files[0]);
    if (event.target.files[0]) {
      this.setState({ file: event.target.files[0]})
    }
  }

  
  Register = async (e) => {
    try {
      e.preventDefault();
      const data = new FormData();
      data.append('file', this.state.file);

      if (!this.state.name) {
        alert("Name is required field")
      }
      else if (!this.state.course || this.state.course === "Select") {
        alert("Course is required field")
      }
      else if (!this.state.Enrollment_Number) {
        alert("Please enter your Enrollment number")
      }
      else if (!this.state.password) {
        alert("Please enter your password")
      }
      else {
        var courseData = await axios.get("course");
      }

    let course=courseData.data.courseData.filter(obj => {
      return (obj.courseName === this.state.course)
    })
  
    let courseID = course[0]._id;

    const res=await axios.post("/studentFiles", data, {
      headers: {
        'Content-type': 'multipart/form-data',
          'course': this.state.course,
          'password': this.state.password,
          'enroll': this.state.Enrollment_Number,
          'studentname': this.state.name,
          'courseid' : courseID
      }
    })
      console.log(res);
      this.setState({message:`${this.state.name} Registered Successfully`})
        console.log("Axios request sent");
      // alert(`${this.state.name} Registered Successfully`);
        this.setState({message:`${this.state.name} Registered Successfully`})
        this.setState({ course: "", age: "", name: "" ,flag:true});
        }

    catch (error) {
      console.log(error)
      window.err = error;
      if (error.response.status===501)
        {
          this.setState({message:"User with same Enrollment already exist's"});
        }
        else {
          this.setState({message:"There was problem with server"});
      }      
    }
  } 
  
  render() { 
    if (this.state.flag) {
      return <Redirect to="/"></Redirect>
      }
        return ( 
          <React.Fragment>
 {this.state.message ? <Message msg={this.state.message} /> : null}
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

    <div className="form-group photo">
              <label for='exampleFormControlInput1'>Attach File</label> 
              <div className="form-group">
                  <input required="" type="file" className="form-control" placeholder="" name="file" onChange={this.handlePic}/>
              </div>
          </div>

      <button type="submit" class="btn btn-register" onClick={this.Register} >Register</button>
</form>
            
</React.Fragment>
         );
    }
}
 
export default Register;