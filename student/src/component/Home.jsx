import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"
// const LO=<Redirect to="/login"></Redirect>
// const LI=<Redirect to="/loggedIn"></Redirect>
class Home extends Component {
  state = { data: [], Query: "", name: "", age: "", course: "",loggedIn : true }
  constructor(props) {
    super(props)
    const Token = localStorage.getItem("Token");
    // let loggedIn = true;
    if (Token == null) {
        this.state.loggedIn = false;
    }
  }
  allStu = []
 
  componentDidMount() {
    
      axios.get("/course").then(response=>{
            var allCourse=response.data.courseData;
             this.allStu=response.data.studentData;
            
           var studArr=[]
            for(let i=0;i<this.allStu.length;i++){
              for(let j=0;j<1;j++) 
              {var id= this.allStu[i]["courseID"];
               studArr.push(allCourse.filter(c=>{
                 if(c._id===id){
                           return c.courseName
                 }
               }))
             
               this.allStu[i].course=studArr[i][j].courseName;
              
              }     }  
              
              this.setState({data:[...this.state.data,...this.allStu]})
              // console.log(this.state.data)
             
         })

      
        
    }
  
    SearchQuery=(event)=>{     
      this.setState({Query:event.currentTarget.value})
    }
    
    handleQuery=(query)=>{
       let data=this.state.data.filter((student)=>{
        return ((student["course"].toLowerCase().includes((query).toLowerCase()))
                || (student["Name"].toLowerCase().includes((query).toLowerCase()))||student._id.includes(query))
     })
    //  console.log(data);
     return data;

    }
  
   handleDelete= async (event)=>{
    let myELement = event.currentTarget.parentElement.parentElement.innerText;
    //  console.log(event.currentTarget.parentElement.parentElement.innerText);

     let AllData = await axios.get("course");
    //  console.log(AllData.data.studentData);
     let student = AllData.data.studentData.filter((stud) => {
       if (myELement.includes(stud.Enrollment_Number)) {
         return stud;
        }
     })
     console.log(student[0]._id);
     let studID = student[0]._id;

     const obj = await axios.delete(`student/${studID}`);
     alert("Student Record Deleted");
     window.location.reload();
    
  }
  
  handleInfo = (event) => {
    console.log(this.state.loggedIn);
    if(this.state.loggedIn){
      window.location.replace("http://localhost:3000/loggedIn")
      // return <Redirect to="/loggedIn"></Redirect>
    
    }
    else {
      window.location.replace("http://localhost:3000/login")
      // return <Redirect to="/login"></Redirect>
      
     }
  }
 
  
  
  render() { 
      
      // console.log(this.state.data)
      let{data,Query,age,name,course}=this.state;
      let newArray=[];
      if(Query!=""){
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
      {/* <th class="Result" scope="col">Result</th> */}
    </tr>
  </thead>
  <tbody>
      
      {newArray.map((student)=>{
          return(
            <tr>
            <td>{student.Enrollment_Number}</td>
            <td>{student.Name}</td>
            <td>{student.course}</td>
            <div><i className="fa fa-eye" onClick={this.handleInfo}></i></div>
            <div><i className="fa fa-user-times" onClick={this.handleDelete}></i></div> 
          </tr>
          )
      })}
    
  </tbody>
            </table>
    
</React.Fragment>
         );
    }
}
 
export default Home;