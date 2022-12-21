/*--------------------------------------------
| Render admin dashboard view
---------------------------------------------*/


const dashboardView = (req, res) => {
    const user = req.user;
    res.render("dashboard", {
    	user    
    } );
}



module.exports =  {
    dashboardView
};