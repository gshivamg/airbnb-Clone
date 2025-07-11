
exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "Login"
  });
};

exports.postLogin=(req,res,next)=>{
  res.redirect("/");  
}
