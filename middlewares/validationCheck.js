const validationCheck = (req,res,next)=>{
    if (req.administrador) next ();
    else res.status(403).send("No tiene permisos para realizar esta acción")
}
module.exports = validationCheck