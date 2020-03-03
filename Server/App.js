const express=require("express");
const courses = require("./Databases/Courses");
const students = require("./Databases/Students");
const color = require('color');
const Upload= require('./Databases/Upload');
const fileUpload = require('express-fileupload')
const http = require('http');
const fs = require('fs');
var rimraf = require("rimraf");
path = require('path')
var directoryPath = `C:/Users/saran-champakali/Desktop/Dashboard-master/server/public/uploads/`;

const app=express();
var courseData;

app.use(express.json());

app.use(fileUpload());
app.use(express.static("public"))
// jo bhi data(image,vides,etc) hume client ko show krna hota vo public folder me rkhte hai 
// and use kr paye uske lie hume btana pdhta hai humare backend public folder konsa hai
// and we do that by  =>    app.use(express.static("public")) 


app.post("/studentFiles", async function (req, res) {
    //    console.log(req.headers);
        let obj = {
            'Name': req.headers.studentname,
            'course':req.headers.course,
            'Enrollment_Number': req.headers.enroll,
            'password':req.headers.password,
            'courseID':req.headers.courseid  
    } 
    
            let path = directoryPath + `${req.headers.enroll}`;
            let flag;
        
            try {
                if (fs.existsSync(path)) {
                    console.log("Directory exists.")
                    flag = false;
                } else {
                    console.log("Directory does not exist.")
                    flag = true;
                }
            }
            catch (e){
                console.log("An error occurred.")
            }

            console.log(flag);  

    try {
       
        if (flag) {
           
            if (req.headers.studentname) {
                const student = await students.create(obj);
                fs.mkdir(directoryPath + `${req.headers.enroll}`, async function(err) {
                if (err) {
                    console.log(err);
                }
                });
           
                if (req.files === null)
                {
                    return res.status(401).json({ msg: "No file uploaded" });
                }

                let file = req.files.file;

                file.mv(path + `/` + `${req.headers.studentname}` + ".jpg", err =>
                {
                    if (err)
                    {
                        console.log(err);
                        return res.status(500).json(err);
                    }
                    else
                    {
                        res.status(201).json({ data: student, msg: "File uploaded" });
                    }
                })
            }
            
            else {
                return res.status(400).json({ msg: "File with same name already exist's" }); 
            }
        }

        else if(!flag) {
            return res.status(501).json({ msg: "File with same name already exist's" })
        }
    }

    catch (error) {
        console.log(error.stack);  
        let err={}; 
        if (error.code === 11000) {
            err.code = 11000
            return res.status(501).send(error);
        }
       else
       { return res.status(500).send(error);}
    }
})
 

app.post('/upload', (req, res) => {
    
    // console.log(req.headers);
    let enroll = req.headers.roll;

    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    let current_datetime = new Date()
    let formatted_date = current_datetime.getDate() + "-" + months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear()
    

    if (req.files === null)
    {
        return res.status(400).json({ msg: "No file uploaded! Please choose file to upload" });
    }

            let file = req.files.file;
            let path = directoryPath + `${enroll}`;
            fs.readdir(path, async function (err, files) {
                //handling error
                if (err)
                {
                    return console.log('Unable to scan directory: ' + err);
                }

                files.forEach(function (fileName) {
                    if (fileName === file.name) {
                        file.name = false;
                        return res.status(400).json({ msg: "File with same name already exist's" });
                    }
                });

                if (file.name) {
                    let obj = {
                        FileName: req.files.file.name,
                        Topic: req.headers.topic,
                        Subject: req.headers.subject,
                        Credits: req.headers.credits,
                        enroll: req.headers.roll,
                        FileSize:req.headers.filesize,
                        date:formatted_date
                    }
                    try {
                        const uploads = await Upload.create(obj);
                        file.mv(path + `/` + `${file.name}`, async (err) => {
                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            }
                                 
                            res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
                        })
                    }
                    
                    catch (error) {
                        console.log(error)
                        // if (error.code === 11000) {
                        //     res.status(401).send(error);
                        // }
                         if (error.name === 'ValidationError') {
                            const message = Object.values(error.errors).map(value=>value.message)
                            console.log(message);
                            res.status(402).send(error)
                        }
                        else {
                            res.status(500).send(error);
                        } 
                    }
                };
            
            });
}) 

app.get("/upload",async function(req,res){
    try{
        uploadData = await Upload.find();
        res.status(201).json(
            {
                 "status":"Data is fetched",
            uploadData
            });  
    }
    catch(err){
        res.status(401).json({
            "status":"fail to get data",
             data:err
        })
    }
})

app.get("/course",async function(req,res){
    try{
         courseData = await courses.find();
        const studentData = await students.find();
        res.status(201).json(
            {
                 "status":"Data is fetched",
                courseData, 
                studentData
            });  
    }
    catch(err){
        res.status(401).json({
            "status":"fail to get data",
             data:err
        })
    }
})
 
app.get('/download', async function (req, res) {
    try {
        let enroll = req.headers.enroll;
        let filename = req.headers.filename;
        let path = directoryPath + `${enroll}/` + `${filename}`;
        var file = fs.readFileSync(path, 'binary');
        console.log(file.length / 1000000);

        // var arrayBuffer = new ArrayBuffer(file.length);
        // var uint8Array = new Uint8Array(arrayBuffer);
        //     for (var i = 0; i < file.length; i++) {
        //     uint8Array[i] = file.charCodeAt(i);
        //     }
        // res.setHeader('Content-type', 'application/pdf');
        // res.setHeader('Content-Length',file.length)
        // console.log(path.length);
        // res.setHeader('Content-disposition', 'attachment; filename=' + (directoryPath, `${enroll}/` + `${filename}`));
        // res.setHeader('Content-type', mimetype);
        // res.setHeader('Transfer-Encoding', 'chunked');
        // res.download(path.join(directoryPath, `${enroll}/` + `${filename}`), function (err) {
 
        // if(err)
        //     {
        //         console.log(err);
        //     }
      
        // }); 
        res.download(path);
        // res.sendFile(uint8Array, (err) => {
        //     if (err)
        //     {
        //         console.log(err);
        //     }
        // })
   }
    catch (err) {
        console.log((err.message))
        res.status(401).json({  
           
           "status":"fail to download",
            data:err.stack
       })
   }
})


app.delete('/student/:id', async(req, res) => {  
    try{ 
        console.log(req.headers.enroll);
        const student = await students.findByIdAndDelete(req.params.id);
        const studentUpload = await Upload.deleteMany({ enroll: req.headers.enroll })
        if (req.headers.enroll) {
            let Path = directoryPath + `${req.headers.enroll}`;
            console.log(Path);

          rimraf(Path, function () { console.log("done"); }); //package to remove non empty directory
        }
        res.status(201).json(
            {
            "status":"deleted succesfully", 
                data: student
                , studentUpload
        });
    }
    
      catch(err){
      console.log(err);
      res.status(401).json({
          "status":"fail to delete data",
          data:err
      })
    }
}); 


app.listen(4000,function(){
    console.log("server is listening at 4000")
})








    