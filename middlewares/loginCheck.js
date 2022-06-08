const loginCheck = (req,res,next) => {
    const userToken = (req.header("X-Coder-Token") === "true");
    if (userToken) {
    req.administrador = true;
    next ();
    }
    else res.status(401).send("Necesita loguearse")
}
module.exports = loginCheck