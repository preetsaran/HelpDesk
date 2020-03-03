import React, { Component } from 'react';
import axios from "axios";
import { Redirect } from "react-router-dom"
import fileDownload from 'js-file-download';
class Home extends Component {
  state = { data: [], Query: "", name: "", age: "", course: "", loggedIn: true, green: false, red: false, uploadData:[]}
  constructor(props) {
    super(props)
    const Token = localStorage.getItem("Token");
    if (Token == null) {
        this.state.loggedIn = false;
    }
  }
  allStu = [];
 
  componentDidMount()
  {
    
      axios.get("/course").then(response=>{
            var allCourse=response.data.courseData;
             this.allStu=response.data.studentData;
            
           var studArr=[]
        for (let i = 0; i < this.allStu.length; i++)
        {
          for(let j=0;j<1;j++)  
          {
            var id = this.allStu[i]["courseID"];
            studArr.push(allCourse.filter(c =>
            {
              return (c._id === id)
            }))
            this.allStu[i].course=studArr[i][j].courseName; 
          }
        }  
              
              this.setState({data:[...this.state.data,...this.allStu]})
             
      })
    
     axios.get("/upload").then(response=>{
          var allUploads=response.data.uploadData;
          this.setState({ uploadData: allUploads });
     })
    
  }
  
  SearchQuery = (event) => {     
      this.setState({Query:event.currentTarget.value})
    }
    
  handleQuery=(query)=>{
      let data = this.state.uploadData.filter((udata) => {
        return ((udata["Subject"].toLowerCase().includes((query.toLowerCase()).toLowerCase()))
                || (udata["Topic"].toLowerCase().includes((query.toLowerCase()).toLowerCase()))||udata["Credits"].toLowerCase().includes(query.toLowerCase()))
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

  handleDownload = async (student) => {
      try {
        let enroll = student.enroll;
        let filename = student.FileName;
        let res = await axios.get('/download', {
          headers: {
            enroll,
            filename
          }
        },{ responseType: 'arraybuffer' });
         
        console.log(res.data); 
        fileDownload(res.data, `${filename}`);
        
        }
      catch (error) {
        console.log(error);
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
        newArray=this.state.uploadData;
    }
    
    console.log(newArray.length);

        return (
          <React.Fragment>
            <div class="SearchResults"> 
            <input class="form-control" type="text" value={this.state.Query} placeholder="SearchBy...(Topic,Subject,Name)" onChange={this.SearchQuery} ></input>
              <h6 class="mt-3 ml-2">{` ${newArray.length}` + ' results'}</h6>
              </div>
          <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">Subject</th>
      <th scope="col">Topic</th>
      <th scope="col">Upload Date</th>
      <th scope="col">Credits</th>
      <th scope="col">Filesize</th>  
    </tr>
  </thead> 
  <tbody>
      
      {newArray.map((data)=>{
          return(
            <tr>
            <td>{data.Subject}</td>
            <td>{data.Topic}</td>
            <td>{data.date}</td>
            <td>{data.Credits}</td>
            <td>{data.FileSize}</td>
            <td className="info_icon"><i class="fa fa-download" onClick={() => { this.handleDownload(data) }}></i></td>
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