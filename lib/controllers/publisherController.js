function servePublisherHome(req,res){
    var options = {
        signedIn: false
    }
    return res.render('./../views/publisher/publisherHome.ejs',{options:options})
}

function servePublisherInfo(req,res){
    var options = {
        signedIn: false
    }
    return res.render('./../views/publisher/publisherInfo.ejs',{options:options})
}

function servePublisherSearch(req,res){
    var options = {
        signedIn: false
    }
    return res.render('./../views/publisher/publisherSearch.ejs',{options:options})
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
    servePublisherHome,
    servePublisherInfo,
    servePublisherSearch,
    searchBook
}