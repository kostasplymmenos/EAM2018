function serveStudentHome(req,res){
    var options = {
        signedIn: false
    }
    return res.render('./../views/student/studentHome.ejs',{options:options})
}

function serveStudentInfo(req,res){
    var options = {
        signedIn: false
    }
    return res.render('./../views/student/infoStudent.ejs',{options:options})
}

function serveStudentSearch(req,res){
    var options = {
        signedIn: false
    }
    return res.render('./../views/student/studentSearch.ejs',{options:options})
}

function searchBook(req,res){
    var str = 'You amde a query for book with '
    if(req.query.author)
        str += "author " + req.query.author
    if(req.query.title)
        str += "title " + req.query.title
    res.send(str)
}


module.exports = {
    serveStudentHome,
    serveStudentInfo,
    serveStudentSearch,
    searchBook
}