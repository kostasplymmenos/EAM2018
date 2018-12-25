module.exports = function basicHome(req,res){
    //exw pare user apo mongo
    var user = {name: 'kostas'}
    return res.render('./../views/index.ejs',{user:user})
}
