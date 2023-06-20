const db = require("./db");

login = (email, password) => {
  try {
    return db.Admin.findOne({ email, password }).then((admin) => {
      console.log(admin);
      if (admin) {
        return {
          status: true,
          statusCode: 200,
          message: "Login successful",
          admin,
        };
      } else {
        return {
          status: false,
          statusCode: 401,
          message: "Incorrect email or password",
        };
      }
    });
  } catch (error) {
    console.log(error);
    return {
      status: false,
      statusCode: 500,
      message: "An error occurred during login",
    };
  }
};

getDoctors = () => {
  return db.Doctor.find().then((users) => {
    if (users) {
      return {
        status: true,
        statusCode: 200,
        message: users,
      };
    } else {
      return {
        status: false,
        statusCode: 400,
        message: "no doctor present",
      };
    }
  });
};

addDoctor = (id, name, specialization, email, phone,time) => {
  try {
    console.log(id);
    return db.Doctor.findOne({ id }).then((doctor) => {
      if (doctor) {
        return {
          status: false,
          statusCode: 400,
          message: "Doctor already present",
        };
      } else {
        const newDoctor = new db.Doctor({
          id,
          name,
          specialization,
          email,
          phone,
        time
        });
        newDoctor.save();
        return {
          status: true,
          statusCode: 200,
          message: "New doctor added",
        };
      }
    });
  } catch (error) {
    console.log(error);
    return {
      status: false,
      statusCode: 500,
      message: "An error occurred while adding a doctor",
    };
  }
};

editDoctor = (id, name, specialization, email, phone,time) => {
  try {
    console.log(id);
    return db.Doctor.findOne({ id }).then((doctor) => {
      if (doctor) {
        (doctor.name = name),
          (doctor.specialization = specialization),
          (doctor.email = email),
          (doctor.phone = phone),
          (doctor.time = time),
        

        doctor.save();
        return {
          status: true,
          statusCode: 200,
          message: " doctor  data updated",
        };
      } else {
        return {
          status: false,
          statusCode: 400,
          message: "no doctor present",
        };
      }
    });
  } catch (error) {
    console.log(error);
    return {
      status: false,
      statusCode: 500,
      message: "An error occurred while upadting a doctor",
    };
  }
};

viewDoctor = (id) => {
  return db.Doctor.findOne({ id }).then((users) => {
    if (users) {
      return {
        status: true,
        statusCode: 200,
        message: users,
      };
    } else {
      return {
        status: false,
        statusCode: 400,
        message: "no Doctor present",
      };
    }
  });
};

deleteDoctor = (id) => {
  return db.Doctor.deleteOne({ id }).then((users) => {
    if (users) {
      return {
        status: true,
        statusCode: 200,
        message: "doctor deleted",
      };
    } else {
      return {
        status: false,
        statusCode: 400,
        message: "no doctor present",
      };
    }
  });
};

checkDoctor = (email) => {
  return db.Doctor.findOne({ email }).then((users) => {
    if (users) {
      return {
        status: true,
        statusCode: 200,
        message: "access success",
      };
    } else {
      return {
        status: false,
        statusCode: 400,
        message: "access denied",
      };
    }
  });
};

registerDoctor = (email, username, password) => {
  try {
    return db.Ddoctor.findOne({ email }).then((doctor) => {
      if (doctor) {
        return {
          status: false,
          statusCode: 400,
          message: "Doctor already present",
        };
      } else {
        const newDoctor = new db.Ddoctor({
          email,
          username,
          password,
        });
        newDoctor.save();
        return {
          status: true,
          statusCode: 200,
          message: "register success",
        };
      }
    });
  } catch (error) {
    console.log(error);
    return {
      status: false,
      statusCode: 500,
      message: "An error occurred while adding a doctor",
    };
  }
};

doctorlogin = async (email, password) => {
  try {
    const admin = await db.Ddoctor.findOne({ email, password });
    console.log(admin);

    if (admin) {
      const doctor = await db.Doctor.findOne({ email });
      if (doctor) {
        return {
          status: true,
          statusCode: 200,
          message: "Login successful",
          doctorId: doctor.id, // Retrieve the id key from the Doctor collection
        };
      } else {
        return {
          status: false,
          statusCode: 401,
          message: "Doctor not found with the given email",
        };
      }
    } else {
      return {
        status: false,
        statusCode: 401,
        message: "Incorrect email or password",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: false,
      statusCode: 500,
      message: "An error occurred during login",
    };
  }
};


registerUser = (email, username, password) => {
  try {
    return db.User.findOne({ email }).then((user) => {
      if (user) {
        return {
          status: false,
          statusCode: 400,
          message: "User already present",
        };
      } else {
        const newUser = new db.User({
          email,
          username,
          password,
        });
        newUser.save();
        const nUser = new db.Usser({
          email,
        });
        nUser.save();

        return {
          status: true,
          statusCode: 200,
          message: "register success",
        };
      }
    });
  } catch (error) {
    console.log(error);
    return {
      status: false,
      statusCode: 500,
      message: "An error occurred while adding a doctor",
    };
  }
};

userlogin = (email, password) => {
  try {
    return db.User.findOne({ email, password }).then((user) => {
      console.log(user);
      if (user) {
        return {
          status: true,
          statusCode: 200,
          message: "Login successful",
          user,
        };
      } else {
        return {
          status: false,
          statusCode: 401,
          message: "Incorrect email or password",
        };
      }
    });
  } catch (error) {
    console.log(error);
    return {
      status: false,
      statusCode: 500,
      message: "An error occurred during login",
    };
  }
};


const bookDoctor = async (id, uname, age, place, phone, email, date, time) => {
  try {
    const doctor = await db.Doctor.findOne({ id });
    if (!doctor) {
      console.log("Doctor not present");
      return {
        status: false,
        statusCode: 400,
        message: "No doctor present with the given ID",
      };
    }

    const user = await db.User.findOne({ email });
    if (!user) {
      console.log("Invalid user");
      return {
        status: false,
        statusCode: 400,
        message: "Invalid user",
      };
    }

    const existingUser = await db.Usser.findOne({ email, availability: date });
    if (existingUser) {
      console.log("Appointment already booked for this user on the given date");
      return {
        status: false,
        statusCode: 400,
        message: "You have already booked an appointment for this date",
      };
    }

    const existingAppointments = await db.Usser.find({ doctorId: id, availability: date, time });
    if (existingAppointments.length >= 2) {
      console.log("Appointment not available");
      return {
        status: false,
        statusCode: 400,
        message: "Doctor's availability is full",
      };
    }

    const newAppointment = new db.Usser({
      doctorId: id,
      email,
      availability: date,
      time,
      uname,
      age,
      place,
      phone,
    });

    const savedAppointment = await newAppointment.save();
    console.log("Appointment available");
    return {
      status: true,
      statusCode: 200,
      message: "New appointment added successfully",
      appointment: savedAppointment,
    };
  } catch (error) {
    console.log("Error booking appointment:", error);
    throw new Error("Internal server error");
  }
};





ViewBookings = (id) => {
  try {
    return db.Usser.findOne({doctorId:id }).then((user) => {
      console.log(user);
      if (user) {
        return {
          status: true,
          statusCode: 200,
          message: "getting",
          user,
        };
      } else {
        return {
          status: false,
          statusCode: 401,
          message: "no bookings found",
        };
      }
    });
  } catch (error) {
    console.log(error);
    return {
      status: false,
      statusCode: 500,
      message: "An error occurred during login",
    };
  }
};


const checkAvailability = async (id, email, date, time) => {
  try {
    console.log("doctor id is", id);
    console.log("user email is", email);
    console.log("entered date is", date);
    console.log("entered time is", time);

    const doctor = await db.Doctor.findOne({ id });
    if (!doctor) {
      console.log("Doctor not present");
      return {
        status: false,
        statusCode: 400,
        message: "No doctor present with the given ID",
      };
    }

    const user = await db.User.findOne({ email });
    if (!user) {
      console.log("Invalid user");
      return {
        status: false,
        statusCode: 400,
        message: "Invalid user",
      };
    }

    const existingUser = await db.Usser.findOne({ email, availability: date });
    if (existingUser) {
      console.log("Appointment already booked for this user on the given date");
      return {
        status: false,
        statusCode: 400,
        message: "You have already booked an appointment for this date ",
      };
    }

    const existingAppointments = await db.Usser.find({ doctorId: id, availability: date, time });
    const bookedAppointmentsCount = existingAppointments.length;
    console.log("Existing appointments:", existingAppointments);
    console.log("Booked appointments count:", bookedAppointmentsCount);

    if (bookedAppointmentsCount >= 2) {
      console.log("Appointment not available");
      return {
        status: false,
        statusCode: 400,
        message: "Doctor's availability is full",
      };
    }

    console.log("Appointment available");
    return {
      status: true,
      statusCode: 200,
      message: "Appointment is available",
    };
  } catch (error) {
    console.log("Error checking availability:", error);
    throw new Error("Internal server error");
  }
};





getUsers = () => {
  return db.Usser.find().then((users) => {
    if (users) {
      return {
        status: true,
        statusCode: 200,
        message: users,
      };
    } else {
      return {
        status: false,
        statusCode: 400,
        message: "no booking yet",
      };
    }
  });
};



// logic.js



// Function to get booking details by doctorId and email
async function getBookingDetails(email) {
  try {
    const bookingDetails = await db.Usser.find({ email });
    console.log("booking details", bookingDetails);

    const data = await Promise.all(
      bookingDetails.map(async (booking) => {
        const doctor = await db.Doctor.findOne({ id: booking.doctorId });
        if (doctor) {
          return {
            doctorName: doctor.name,
            uname: booking.uname,
            availability: booking.availability,
            time: booking.time,
          };
        } else {
          console.error("Doctor not found for booking:", booking);
          return null;
        }
      })
    );
    
    console.log("data:", data);
    
    const validData = data.filter((item) => item !== null);
    if (validData.length === 0) {
      console.warn("No booking details found.");
    }
    
    return validData;
  } catch (error) {
    throw new Error("Error fetching booking details: " + error.message);
  }
}





module.exports = {
  login,
  addDoctor,
  viewDoctor,
  getDoctors,
  editDoctor,
  deleteDoctor,
  checkDoctor,
  registerDoctor,
  doctorlogin,
  registerUser,
  userlogin,
  bookDoctor,
  ViewBookings,
  checkAvailability,
  getUsers,
  getBookingDetails
  

};
