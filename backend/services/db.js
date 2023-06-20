const mongoose=require("mongoose")

try{
  mongoose.connect("mongodb://127.0.0.1:27017/Hospitals")
  console.log("connected to mongodb");
}catch(error){
  console.log(error)
  throw new Error("Error connecting to MongoDB")
}

const Admin=mongoose.model('Admin',
{
 email:String,
 password:String

}

)

const Doctor = mongoose.model('Doctor', {
  id: String,
  name: String,
  specialization: String,
  email: String,
  phone: String,
  time:String
  
})



const Ddoctor=mongoose.model('Ddoctor',
 {
   uname:String,
    email:String,
    password:String,
 
})

const User=mongoose.model('User',
 {
    uname:String,
    email:String,
    password:String,
 
}

)

const Usser = mongoose.model('Usser', {
  doctorId:String,
  email:String,
  availability:String,
  time:String,
  uname:String,
  age:String,
  place:String,
  phone:String,


})



module.exports={
    Admin,
    Doctor,
    Ddoctor,
    User,
    Usser
}














