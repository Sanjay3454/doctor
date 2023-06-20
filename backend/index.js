const express= require ("express")
const server=express()
const cors=require("cors")
server.use(cors({origin:"http://localhost:3000"}))
//convert json to js 
server.use(express.json())
const logic=require('./services/logic')
const db = require("./services/db");




  server.post("/login", (req, res) =>{
    console.log(req.body.email);
    logic.login(req.body.email,req.body.password).then(result=>{
      res.status(result.statusCode).json(result)
    })
  })

  server.post("/addDoctor", (req, res) =>{
   
    logic.addDoctor(
      req.body.id,
      req.body.name,
      req.body.specialization,
      req.body.email,
      req.body.phone,
      req.body.time).then(result=>{
      res.status(result.statusCode).json(result)
    })
  })

  server.get("/getDoctors", (req, res) =>{
    logic.getDoctors().then(result=>{
      res.status(result.statusCode).json(result)
    })
  })


  server.post("/editDoctor", (req, res) =>{
   
    logic.editDoctor(
      req.body.id,
      req.body.name,
      req.body.specialization,
      req.body.email,
      req.body.phone,
      req.body.time,


      ).then(result=>{
      res.status(result.statusCode).json(result)
    })
  })


  server.get("/viewDoctor/:id", (req, res) =>{
    console.log(req.params);
    logic.viewDoctor(req.params.id).then(result=>{
      res.status(result.statusCode).json(result)
    })
  })


  server.delete("/deleteDoctor/:id", (req, res) =>{
    console.log(req.params);
    logic.deleteDoctor(req.params.id).then(result=>{
      res.status(result.statusCode).json(result)
    })
  })
  


  
  server.post("/accessDoctor", (req, res) =>{
    logic.checkDoctor(
      req.body.email,
      ).then(result=>{
        console.log(result);
      res.status(result.statusCode).json(result)
    })
  })


  

  server.post("/register-doctor", (req, res) =>{
    logic.registerDoctor(
      req.body.email,
      req.body.username,
      req.body.password
      ).then(result=>{
        console.log(result);
      res.status(result.statusCode).json(result)
    })
  })

  
  server.post("/doctor-login", (req, res) =>{
    console.log(req.body.email);
    logic.doctorlogin(req.body.email,req.body.password).then(result=>{
      res.status(result.statusCode).json(result)
    })
  })


  server.post("/register-user", (req, res) =>{
    logic.registerUser(
      req.body.email,
      req.body.username,
      req.body.password
      ).then(result=>{
        console.log(result);
      res.status(result.statusCode).json(result)
    })
  })

  server.post("/user-login", (req, res) =>{
    console.log(req.body.email);
    logic.userlogin(req.body.email,req.body.password).then(result=>{
      res.status(result.statusCode).json(result)
    })
  })


server.post('/bookDoctor', (req, res) => {
 
  id= req.body.id,
  uname=req.body.name,
  age=req.body.age,
  place=req.body.place,
  phone=req.body.phone,
  email=req.body.email,
  date=req.body.date,
  time=req.body.time,
  console.log(id);
  console.log(uname);
  console.log(age);
  console.log(place);
  console.log(phone);
  console.log(email);
  console.log(date);
  console.log(time);
  logic.bookDoctor(id,uname,age,place,phone,email,date,time).then(result=>{
    res.status(result.statusCode).json(result)
  });
 
});





server.post("/checkAvailability", (req, res) =>{
  console.log(req.body.id,req.body.email,req.body.date,req.body.time);
  logic.checkAvailability(req.body.id,req.body.email,req.body.date,req.body.time).then(result=>{
    res.status(result.statusCode).json(result)
  })
})



server.post("/viewBookings", (req, res) =>{
  console.log(req.body.id);
  logic.ViewBookings(req.body.id).then(result=>{
    res.status(result.statusCode).json(result)
  })
})

server.post("/getId", (req, res) =>{
  console.log(req.body.email);
  logic.getId(req.body.email).then(result=>{
    res.status(result.statusCode).json(result)
  })
})



server.get("/getUsers", (req, res) =>{

  logic.getUsers().then(result=>{
    res.status(result.statusCode).json(result)
  })
})

server.get("/bookingDetails/:email", async (req, res) => {
  try {
    const { email } = req.params;

    console.log("userEmail:", email);

    const result = await logic.getBookingDetails(email);
    console.log("result",result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching booking details" });
  }
});




  server.listen(8000, () => {
    console.log("ems server started at port 8000");
  });
  