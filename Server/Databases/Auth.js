const mongoose=require("mongoose");
const DB = 
"mongodb+srv://saran:9013500700@cluster0-15ytn.mongodb.net/CollegeDB?retryWrites=true&w=majority";
mongoose.connect(DB,{ 
    useNewUrlParser:true,
    useCreateIndex:true ,
    useUnifiedTopology:true 
})
.then(function(conn){
    // console.log(conn.connection);nt
    // console.log("student");
});

var AuthSchema = new mongoose.Schema({
    Name: { type: String, required: [true, "Name is required field"] },
    email: {type:String,required:[true,"email is required field"]},
    Enrollment_Number:{type:String,required:[true,"Enrollment Number is required field"]},
    password: { type: String, required: [true, "Age is required field"] },
    courseID: { type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: [true, "Course ID is required field"] }
})

const AuthModel=mongoose.model("Auth",AuthSchema);
console.log(AuthModel);
module.exports=AuthModel;
