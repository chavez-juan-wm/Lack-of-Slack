// Middleware to fix a CORS issue
module.exports =
    function cores(req, res, next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    };