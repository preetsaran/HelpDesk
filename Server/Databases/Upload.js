const mongoose=require("mongoose");
const DB = 
"mongodb+srv://saran:9013500700@cluster0-15ytn.mongodb.net/CollegeDB?retryWrites=true&w=majority";
mongoose.connect(DB,{ 
    useNewUrlParser:true,
    useCreateIndex:true ,
    useUnifiedTopology:true 
})
.then(function(conn){
    console.log("Connected to UploadDB");
});

var UploadSchema = new mongoose.Schema({
    FileName: { type: String, required: [true, "Name is required field"] },
    Topic: { type: String, required: [true, "Topic is required field"] },
    Subject: { type: String, required: [true, "Subject is required field"] },
    Credits: { type: String, required: [true, "Credit is required field"] },
    enroll: { type: String, required: [true, "Enrollment Number is required field"] },
    FileSize: { type: String, required: [true, "Name is required field"] },
    date:{type:String,default: Date.now }
    })

const UploadModel=mongoose.model("Upload",UploadSchema);
console.log(UploadModel);
module.exports=UploadModel;
 