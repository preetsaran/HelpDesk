const express=require("express");
const courses = require("./Databases/Courses");
const students = require("./Databases/Students");
const Auth = require('./Databases/Auth');
const mongoose = require("mongoose");
const app=express();
var courseData;
app.use(express.json());

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
 
app.post("/student",async function(req,res){
    try{
        // console.log(student);
        let obj = req.body.student;
        // console.log(obj);
        const student = await students.create(obj);
        res.status(201).json(
            {
            "status":"Created succesfully",
           " data":student
        });
    }
    
      catch(err){
      console.log(err);
      res.status(401).json({
          "status":"fail to add data",
          data:err 
      })
    }
})

app.post("/auth",async function(req,res){
    try{
        
        let obj = req.body;
        const Auths = await Auth.create(obj);
        res.status(201).json(
            {
            "status":`${obj.Name} signed-up succesfully`,
            data:Auths
        });
    }
    
      catch(err){
      console.log(err);
      res.status(401).json({
          "status":"fail to add data",
          data:err 
      })
    }
})

app.delete('/student/:Enrollment_Number', async(req, res) => {  
    try{ 
        
        const student = await students.findByIdAndDelete(req.params.Enrollment_Number);
        res.status(201).json(
            {
            "status":"deleted succesfully", 
            data:student
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








    