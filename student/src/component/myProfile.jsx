import React, { Component, useState, Children } from 'react';
import Info from './info.jsx'
import FileUpload from './fileUpload';
// var directoryPath = `C:/Users/saran-champakali/Desktop/Dashboard-master/student/public/uploads/`;
class LoggedIn extends Component {
    state = { data: [], name: "", user: [],uploaded:{}}
    directoryPath = `C:/Users/saran-champakali/Desktop/Dashboard-master/student/public/uploads/`;
  constructor(props) {
      super(props)
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    this.state.user = user;
    
  }

  componentDidMount = () => {
    document.getElementsByClassName('INFO')[0].remove();
 }


  render() {
    let Path;
    if (this.state.user)
    {
      Path = `/uploads/` + `${this.state.user[0].Enrollment_Number}/` + `${this.state.user[0].Name}` + `.jpg`
    }
        return (
            <React.Fragment>
            <div className="PROFILE">
              <section className="MYPROFILE">
                
              <img  
              className="userImg" 
              // src={require('.Images/user.png')} 
              src={Path}
              alt="Third slide" /> 
        
                
                  
                  <div className="desc">
                  <div className="userDesc text-justify">
                    <h3>Name</h3>
                    <h3>Enrollment</h3>
                  </div>
                  <div className="uservValues text-justify">
                    <h3 className="userVal name">{this.state.user[0].Name}</h3>
                    <h3 className="userVal Enroll">{this.state.user[0].Enrollment_Number}</h3>
                  </div>
                  </div>
              </section>

              <section className="MYUPLOADS">
              <h1>Upload</h1>
                <FileUpload
                  showFile={this.showFile}
                  enroll={this.state.user[0].Enrollment_Number}
                  name={this.state.user[0].Name}
                  />
              </section>
                </div>
                
                {/* {this.state.uploaded ? (
                    <div className="UploadedFile">
                        <div>
                  <h3>{this.state.uploaded.filename}</h3>
                  <img style={{ width: '100%' }} src={this.state.uploaded.filePath} alt='' />
                            </div>
                    </div>
            ) : null} */}
            
            <div className="MYUPLOADSLIST">
            <h1 className="text-center mP">My Uploads</h1>
            
            <Info
                StudentName={this.state.user[0].Name} />
              </div>

</React.Fragment> 
    )
    
    }
}

export default LoggedIn;
