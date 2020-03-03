import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = (props) => {
    const [file, setFile] = useState('')
    const [filename, setFilename] = useState('');
    const [filesize, setFilesize] = useState('');
    const [uploadFile, setUploadFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [Subject, setSubject] = useState('');
    const [Topic, setTopic] = useState('');   
   
    const enroll = props.enroll;
    const credits = props.name;
    
   
   const handleFile = (event) => { 
       event.preventDefault(); 
       if(event.target.files[0])
       {
          let size = Math.ceil(event.target.files[0].size / 1000000) + ` mb`;
           setFile(event.target.files[0]);
           setFilename(event.target.files[0].name);
           setFilesize(size)
           console.log(size);
       }
    }
 
    const onClickHandler = async (e) => {
        e.preventDefault();
        const data = new FormData() 
        data.append('file', file)
         
        try
        {
                const res = await axios.post("/upload", data, {
                    headers: {
                        'Content-type': 'multipart/form-data',
                        'roll': enroll,
                        'credits': credits,
                        'topic': Topic,
                        'subject': Subject,
                        'filesize':filesize
                    },
                    onUploadProgress: progressEvent => {
                        setUploadPercentage(
                            parseInt(
                                Math.round((progressEvent.loaded * 100) / progressEvent.total)
                            )
                        );
                        setTimeout(() => setUploadPercentage(0), 5000); // Clear percentage
                    }
                })
                
                const { fileName, filePath } = res.data;
                setUploadFile({ fileName, filePath })
                setMessage('File Uploaded')
                // let obj = { "filename": fileName, "filePath": filePath }
               

                setTopic('');
                setSubject('');
                e.preventDefault();
           
        }
        
        catch (error)
        {
            if (error.response) {
                if (error.response.status === 500) {
                    setMessage('There was problem with server')
                }
                else if (error.response.status === 401) {
                    // setMessage('There was problem with server')
                    setMessage(`File with same name already exist's`);
                    alert(`File with same name already exist's`)
                }
                else if (error.response.status === 402) {
                    setMessage('Please fill all the fields');
                    alert(`Please fill all the fields`)
                }
               
                else {
                    setMessage(error.response.data.msg);
                    if (error.response.data.msg === "File with same name already exist's") {
                        alert("File with same name already exist's");
                    }
                }
            }
            else
                console.log(error);
          
        } 
       
    }

    const handleTopic = (e) => {
        setTopic(e.target.value);
    }

    const handleSubject = (e) => {
        setSubject(e.target.value);
    }

   
    return (
    
        <Fragment>
            
            {message ? <Message msg={message} /> : null}
            
            <form enctype="multipart/form-data" method="post" class="form-horizontal" id="open-upload-form">
                <div class="form-group container row">
                    <div class="form-check col-xs-3 ">
                        <input class="form-check-input" type="radio" name="category" id="exampleRadios" value="notes" required="" />
                        <label class="form-check-label pl-1" for="exampleRadios1" >
                            Notes
                            </label>
                    </div>
                    <div class="form-check col-xs-3 ">
                        <input class="form-check-input" type="radio" name="category" id="exampleRadios" value="practicalfiles" required="" />
                        <label class="form-check-label pl-1" for="exampleRadios2">
                            Practical Files
                            </label>
                    </div>
                    <div class="form-check col-xs-3 ">
                        <input class="form-check-input" type="radio" name="category" id="exampleRadios" value="questionpapers" required="" />
                        <label class="form-check-label pl-1" for="exampleRadios3">
                            Question Papers
                            </label>
                    </div>
                    <div class="form-check col-xs-3 ">
                        <input class="form-check-input" type="radio" name="category" id="exampleRadios" value="ebooks" required="" />
                        <label class="form-check-label pl-1" for="exampleRadios4">
                            eBooks
                            </label>
                    </div>
                </div>

                <Progress percentage={uploadPercentage} />
                
                <div className="form-main upload">
                    <div className="form-group upload">
                        <label className="col-sm-2 control-label" htmlFor='customFile'>Attach File</label> 
                        <div className="col-sm-10">
                            <input required="" type="file" className="form-control upload" placeholder="" name="file"  onChange={handleFile} />
                        </div>
                    </div>
                    <div className="form-group upload">
                        <label className="col-sm-2 control-label" for="">Topic</label>
                        <div className="col-sm-10">
                            <input required="required" type="text" className="form-control upload" placeholder="Topic" name="topic" value={Topic} onChange={handleTopic} />
                        </div>
                    </div>
                    <div className="form-group upload">
                        <label className="col-sm-2 control-label" for="">Subject</label>
                        <div className="col-sm-10">
                            <input required="" type="text" className="form-control upload" placeholder="Subject" name="subject" id="subject" autocomplete="off" value={Subject} onChange={handleSubject}/>
                            <div id="subjectList"></div>
                        </div>
                    </div>
                   
                    
                </div>

                <div class="col-sm-offset-2">
               
                    <button type="submit" className="btn btn-register upload"  onClick={onClickHandler}>Upload</button>
                </div>
            </form>

           
    
        </Fragment>

    )
}

export default FileUpload;
