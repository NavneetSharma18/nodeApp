const {PROJECT_DIR}               = require('../setting.js');
const flash                       = require('connect-flash');


/*--------------------------------------------
| Render admin dashboard view
---------------------------------------------*/


const dashboardView = (req, res) => {
    const user = req.user;
    res.render("dashboard", {
    	user    
    } );
}

/*--------------------------------------------
| Render File upload view
---------------------------------------------*/

const uploadView = (req, res) => {

    const user = req.user;
    res.render("upload_image",{user,req});
}

/*--------------------------------------------
|  File upload functionality
---------------------------------------------*/

const uploadPost = (req, res) => {
         
	     if (!req.files){
	     	    
	     		req.flash('error_msg','Please select file');
	            res.redirect('/admin/upload');

	      }else if(req.files.uploadfile.mimetype != 'image/jpeg'){

	      	    req.flash('error_msg','Only jpeg file allowed');
	            res.redirect('/admin/upload');

	      }else{

	      	     sampleFile = req.files.uploadfile;
			     uploadPath = PROJECT_DIR+'/uploads/'+Date.now()+sampleFile.name;

			     sampleFile.mv(uploadPath, function(err) {

				     if (err){

				     	req.flash('error_msg',err);
		                res.redirect('/admin/upload');
		             
				     }else{

				     	req.flash('success_msg','File uploaded successfully!');
		                res.redirect('/admin/upload');
		                
				     }
			      
			     });
        	  
			}
    
}





module.exports =  {
    dashboardView,
    uploadView,
    uploadPost
};