module.exports = function(req,res,next){
    if(req.token){
        console.log('token approved')
        next()
        return
    }
    res.send('not auth')
    console.log("did not get tocken")
}