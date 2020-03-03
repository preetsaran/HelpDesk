import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"
// const LO=<Redirect to="/login"></Redirect>
// const LI=<Redirect to="/loggedIn"></Redirect>
class Admin extends Component {
  state = { data: [], Query: "", name: "", age: "", course: "", loggedIn: true, green: false, red: false, uploadData:[]}
  constructor(props) {
    super(props)
    const Token = localStorage.getItem("Token");
    if (Token == null) {
        this.state.loggedIn = false;
    }
  }
  allStu ;
 
  componentDidMount() {
    
    axios.get("/course").then(response =>
    {
        var allCourse=response.data.courseData;
        let allStu=response.data.studentData;
      
        allStu = allStu.filter((data) => {
        return data.Name!=='admin'
        })
        
        var studArr = [];

        for (let i = 0; i < allStu.length; i++)
        {
          var id = allStu[i]["courseID"];
        
          studArr.push(allCourse.filter(c =>
          {
            return (c._id === id)
          }))
        
          allStu[i].course=studArr[i][0].courseName; 
        
        }
              
         this.setState({ data: allStu })
      
      // this.setState({data:[...this.state.data,...allStu]})
      })
    
     axios.get("/upload").then(response=>{
       var allUploads = response.data.uploadData;
      //  console.log(allUploads)
       
           this.setState({uploadData:allUploads})
       })
  
    }
  
  SearchQuery = (event) => {     
      this.setState({Query:event.currentTarget.value})
    }
    
  handleQuery=(query)=>{
       let data=this.state.data.filter((student)=>{
        return ((student["course"].toLowerCase().includes((query).toLowerCase()))
                || (student["Name"].toLowerCase().includes((query).toLowerCase()))||student._id.includes(query))
     })
     return data;

    }
  
  handleDelete = async (student) => {
     
    let confirm = window.confirm("Do you really want to delete?");
    if (confirm) {
     let studID = student._id;
      await axios.delete(`student/${studID}`, {
        headers: {
          enroll:student.Enrollment_Number
        }
      });
     alert("Student Record Deleted");
     let newData = await axios.get("course");
     this.setState({data:newData.data.studentData})
    }
  }
  
  handleInfo = async (student) => {

    let stud= JSON.stringify(student);
    localStorage.setItem("student", stud);
    
    if (this.state.loggedIn) {
      this.setState({green:true})
    }
    else {
      this.setState({red:true})
    }
    }

  
  render() { 
    if (this.state.green) {
      return <Redirect to="/info"></Redirect>
    }
    else if (this.state.red) {
      return <Redirect to="/login"></Redirect>
    }

      let{data,Query}=this.state;
      let newArray=[];
      if(Query!==""){
        newArray=this.handleQuery(Query)
      }
      else{
        newArray=data;
      }
        return ( 
               <React.Fragment>
          <input class="form-control" type="text" value={this.state.Query} placeholder="Search.." onChange={this.SearchQuery} ></input>
          <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Enrollment No.</th>
      <th scope="col">Name</th>
      <th scope="col">Course</th>
    </tr>
  </thead> 
  <tbody>
      
      {newArray.map((student)=>{
          return(
            <tr>
            <td>{student.Enrollment_Number}</td>
            <td>{student.Name}</td>
            <td>{student.course}</td>
            <td><i className="fa fa-eye" onClick={()=>{this.handleInfo(student)}}></i></td>
            <td><i className="fa fa-user-times" onClick={()=>{this.handleDelete(student)}}></i></td> 
            </tr>
          )
      })}
    
  </tbody>
  </table>
    
</React.Fragment>
         );
    }
}
 
export default Admin;