const mongoose = require("mongoose");



/*----------------------------------------------------------
| Declare model schemas and Create model in mongo
----------------------------------------------------------*/



const userSchema = mongoose.Schema({

  name: {
    type: String,
    min: [3, "Invalid username must have at least 3 char."],
    required: [true, "Username can't be blank"],
  },
  password: {
    type: String,
    min:[3,'Must have at least 3 char'],
    required: [true, "Password can't be blank"],
  },
  email:{
    type: String,
    min: [3, "Invalid name must have at least 3 char."],
    required: [true, "Name can't be blank"],
  },
 
  role_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]

});


const User = mongoose.model("User", userSchema);





module.exports = User;