const config = require('../config/config');
const jwt = require('jsonwebtoken');

var verify = {
    verifyUserToken: function (req, res, next) {
        const token = req.headers.token;
        console.log(token);
        const requestedUserId = req.params.recordId;
        console.log(requestedUserId);

        jwt.verify(token, config.JWTKey, function (err, decodedToken) {
            if (err) {
                res.status(403).send({ "Message": "Unauthorized" });
            }
            else {
                console.log(decodedToken);
                if (requestedUserId == decodedToken.id) {
                    req.body.userId = decodedToken.id;
                    next();
                }
                else {
                    res.status(403).send({ "Message": "Unauthorized" });
                }
            }
        });
    },

    verifyToken: function (req, res, next) {
        const token = req.headers.token;
        console.log(token)
        jwt.verify(token, config.JWTKey, function(err, decodedToken){
            if(err){
                res.status(403).send({ "Message": "Unauthorized" });
                console.log('err')
            }
            else{
                console.log(decodedToken);
                req.body.userId = decodedToken.id;
                req.body.role = decodedToken.role;
                console.log(decodedToken.role);
                next();
            }
        })
    },

    verifyRole: function (req, res, next) {
        const role = req.body.role;
        console.log(role);
        if (role == "admin") {
            next()
        }
        else {
            res.status(403).send("Unauthorized")
        }
    }

}

module.exports = verify;