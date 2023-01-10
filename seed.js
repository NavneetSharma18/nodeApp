const express           = require('express');
const dotenv            = require('dotenv');
const flash             = require('connect-flash');
const {isAuthenticated} = require('./auth/auth.js');
const mongoose          = require('mongoose');
const passport          = require('passport');
const { check, validationResult } = require('express-validator');
const session           = require('express-session');
const bcrypt            = require('bcrypt');
const md5               = require('md5');
const app               = express();

const Role              = require('./models/role');
const User              = require('./models/user');



mongoose.set("strictQuery", false);


/*------------------------------------------
| Connecting to mongo DB
--------------------------------------------*/


mongoose
  .connect('mongodb+srv://root:root@cluster0.m7nltbc.mongodb.net/natours?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {


    console.log("Successfully connect to MongoDB.");
    
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });




/*------------------------------------------
| Insert demo data for role collection
--------------------------------------------*/

const seedRole =[
			{
				label    :'Adminstrative',
				role_name:'admin'
			},
			{
				label    :'User',
				role_name:'user'
			},
	];


const seedRoleData = async() => {

	 await Role.deleteMany({})
	 await User.deleteMany({})

	 seedRole.forEach(function(val){
	 	console.log(val)

      const roleModel      = new Role();
      const userModel      = new User();

      roleModel.label      = val.label;
      roleModel.role_name  = val.role_name;
	  
      const result = roleModel.save().then(res => {

      	

      	     if(val.role_name == 'admin'){

			  	  
			      userModel.name      = 'Admin';
			      userModel.password  = md5(md5('admin@123'));
			      userModel.email     = 'admin@admin.com';
			      userModel.role_id   = res._id;
				  
				  userModel.save().then(data => {
				      	  console.log(data);

				   }).catch( err =>{
				            console.log(err)
				   });

			  }else{
			  	  userModel.name      = 'Test User';
			      userModel.password  = md5(md5('testuser@123'));
			      userModel.email     = 'testuser@admin.com';
			      userModel.role_id   = res._id;

				  userModel.save().then(data => {
				      	  console.log(data);

				   }).catch( err =>{
				            console.log(err)
				   });
			  }

       }).catch( err =>{
            console.log(err)
      });

    

	});
	 
};

seedRoleData().then(()=>{
	//mongoose.connection.close()
	console.log('--done---')
})
