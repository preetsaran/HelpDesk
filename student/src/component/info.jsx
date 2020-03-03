import React, { Component } from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download';
import { Link, Redirect } from "react-router-dom"
import {saveAs} from 'file-saver';
class LoggedIn extends Component {
    state = { data: [], name: "", course: "" ,studCourse:[],user:[],student:{},downloadPath:false,profile:[]}
  
  constructor(props) {
    super(props)
    const Token = localStorage.getItem("Token");
    let stud= localStorage.getItem("student");
    stud=JSON.parse(stud);
    if (Token == null) {
      if(this.props.changeToken)
      {
        this.props.changeToken(false)
      }


    }
    if (this.state.downloadPath) {
      this.props.getDownloadPath(this.state.downloadPath);
    }
    this.state.student = stud;
  }
 
  componentDidMount() {
    
    axios.get("/upload").then(response=>{
          var allUploads=response.data.uploadData;
          let studInfo = allUploads.filter((student) => {
              return (student.Credits===this.state.student.Name)
          })
          
          let profileInfo=allUploads.filter((student) => {
            return (student.Credits===this.props.StudentName)
          })
      this.setState({ profile: profileInfo });
        this.setState({ user: studInfo });
           
       })
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

      // var file = new Blob([res.data], {type: "application/pdf"})
      // saveAs(file);
      fileDownload(res.data, `${filename}`);
      
      }
    catch (error) {
      console.log(error);
    }
    
  }

  
    render() { 
    
    let Path = `uploads/` + `${this.state.student.Enrollment_Number}/` +`${this.state.student.Name}`+`.jpg`
  
      if (window.location.href !== 'http://localhost:3000/info')
      {
        this.state.user = this.state.profile;
      }
      return ( 
         
          <React.Fragment>
           <div className="InfoWrapper">
            <table class="table table-dark info">
  <thead>
                <tr>
                  <th class="LoggedIN" scope="col">Subject</th>
                  <th class="LoggedIN" scope="col">Topic</th>
                  <th class="LoggedIN" scope="col">Upload Date</th>
                  <th class="LoggedIN" scope="col">Credits</th> 
                  <th class="LoggedIN" scope="col">Filesize</th>
                </tr>
  </thead>  
        <tbody>
                            {this.state.user.map((studentInfo) => {
                              return (<tr>
                                    <td>{studentInfo.Subject}</td>
                                    <td>{studentInfo.Topic}</td>
                                    <td>{studentInfo.date}</td>
                                    <td>{studentInfo.Credits}</td>
                                    <td>{studentInfo.FileSize}</td> 
                                <td className="info_icon"><i class="fa fa-download" onClick={() => { this.handleDownload(studentInfo) }}></i></td>
                                </tr> )
         })}                   
         
        
   </tbody>
            </table> 
            <div className="INFO">
              <section className="MYINFOPROFILE">
                
              <img  
              className="userImg" 
              src={Path}
              alt={this.state.student.Name}/> 
        
                
       
                  <div className="descinfo">
                  <div className="userDesc text-justify">
                    <h5>Name</h5>
                    <h5>Enrollment</h5>
                  </div>
                  <div className="uservValues text-justify">
                    <h5 className="userVal name">{this.state.student.Name}</h5>
                    <h5 className="userVal Enroll">{this.state.student.Enrollment_Number}</h5>
                  </div>
                  </div>
              </section>
            </div>
     </div>
</React.Fragment>
         );
    }
}
 
export default LoggedIn;
