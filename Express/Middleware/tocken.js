module.exports = function (req,res,next){
    console.log('checking tocken')
    req.token = true
    next()
}