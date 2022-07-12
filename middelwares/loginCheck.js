const loginCheck = ( req, res, next )=> {
  if (!req.session.name){
    res.redirect("/login")
  } else {
    next();
  }
}
module.exports = loginCheck;