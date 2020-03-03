const mongoose=require("mongoose");

const DB= 
"mongodb+srv://saran:9013500700@cluster0-15ytn.mongodb.net/CollegeDB?retryWrites=true&w=majority";
mongoose.connect(DB,{ 
    useNewUrlParser:true,
    useCreateIndex:true ,
    useUnifiedTopology:true 
})
.then(function(conn){
    console.log("student DB");
});

var StudentSchema=new mongoose.Schema({
    Name: {type:String,required:[true,"Name is required field"]},
    Enrollment_Number:{type:String,required:[true,"Enrollment Number is required field"],unique:true},
    password: { type: String, required: [true, "Password is required field"] },
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: [true, "Course ID is required field"] }
})

const studentModel=mongoose.model("student",StudentSchema);
console.log(studentModel)
module.exports=studentModel;


