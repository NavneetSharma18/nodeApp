// For View 
const dashboardView = (req, res) => {
    const user = req.user;
    console.log(user);
    res.render("dashboard", {
    	user    
    } );
}
module.exports =  {
    dashboardView
};