import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"
class LoggedIn extends Component {
    state = { data: [], name: "", course: "" ,studCourse:[]}
    myStudent = window.student;
  
  constructor(props) {
    super(props)
    const Token = localStorage.getItem("Token");
    if (Token == null) {
        this.props.changeToken(false)
    }
  }
 
 
  // componentDidMount(){
  //   axios.get("/course").then(response=>{
  //         var allCourse=response.data.courseData;
  //       // console.log(allCourse);
  //       let Course = allCourse.filter((course) => {
  //           //  console.log(course)
  //           if (course._id === this.myStudent.courseID)
  //           {
  //               // console.log(course)
  //               return course;
  //           }
            
  //       })
        
  //       this.setState({studCourse:Course})
  //   })
  // }
  
  render() { 
      // console.log(this.state.data)
        // console.log(this.state.studCourse.courseName);
        let newArray = this.myStudent;
        // console.log(this.myStudent.courseID);
     
        return ( 
               <React.Fragment>
          
            {/* <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Enrollment No.</th>
      <th scope="col">Name</th>
      <th scope="col">Course</th>
      <th scope="col">Result</th>
    </tr>
  </thead>
  <tbody>
      
                        
                            
                                {/* <tr>
                                    <td>{this.myStudent._id}</td>
                                    <td>{this.myStudent.Name}</td>
                                    <td>{this.state.studCourse.courseName}</td>
                                    <div><i className="fa fa-eye" onClick={this.handleInfo}></i></div>
                                </tr> */}
                            
                        
    
  {/* </tbody>
            </table> */}

            <h1>User Logged In</h1>
     
</React.Fragment>
         );
    }
}
 
export default LoggedIn;
