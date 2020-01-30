const mongoose=require("mongoose");

const DB= 
"mongodb+srv://saran:9013500700@cluster0-15ytn.mongodb.net/CollegeDB?retryWrites=true&w=majority";
mongoose.connect(DB,{ 
    useNewUrlParser:true,
    useCreateIndex:true ,
    useUnifiedTopology:true
})
.then(function(conn){
    console.log("connected to db");
});

const courseSchema=new mongoose.Schema({
    courseName: {type:String,required:[true,"Name is required field"],unique: true },
    teacherName:{type:String,required:[true,"Teacher-Name is required field"]},
    courseCredits:{type:Number,required:true,max:100},
})

const CourseModel=mongoose.model("CourseModel",courseSchema);
module.exports=CourseModel;

 


