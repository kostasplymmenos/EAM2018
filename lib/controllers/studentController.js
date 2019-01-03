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

function serveRegisterPage(req,res){
    var options = {
        signedIn: false
    }
    return res.render('./../views/student/studentRegister.ejs',{options:options})
}

function registerStudent(req,res){
    //check if password and passwordCheck are the same
    if(req.body.password != req.body.passwordCheck)
        return res.redirect(req.originalUrl)

    //create new user from request's form
    var newUser = new User({email     : req.body.username,
                            firstname : req.body.firstname,
                            lastname  : req.body.lastname,
                            university : req.body.university,
                            department : req.body.department,
                            regNum: req.body,regNum,
                            telephone : req.body.tel
    });

    //register new user to users collection (via mongoose)
    User.register(newUser, req.body.password, function(err, user){
        if(err)
            return res.redirect(req.originalUrl)
        else{
            //log in the new user
            passport.authenticate("local")(req, res, function(err){
                if(err)
                    return res.redirect(req.originalUrl)
                req.session.Auth = user;
                //redirect to logged user's home page
                console.log("[INFO] User Registered Succesfully: " + req.session.Auth.email);
                return res.redirect(req.originalUrl);
            });
        }
    });
}

function loginStudent(req,res){
    return res.send('dsf')
}

module.exports = {
    serveStudentHome,
    serveStudentInfo,
    serveStudentSearch,
    searchBook,
    serveRegisterPage,
    registerStudent,
    loginStudent
}