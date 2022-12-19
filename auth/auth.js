const isAuthenticated = (req,res,done)=>{

	if(req.user){
		return done()
	}
	return res.redirect("/");
	
}

module.exports =  {
    isAuthenticated,
};