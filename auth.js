const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
try{
//getting the token from header
const token = req.headers.authorization.split(" ")[1];

//checks if the token matchs, throws error if the token origin does not match
const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
const user = await decodedToken;

//savings the user data to req so that it can used in the subsequent endpoints
req.user = user;
next();
}
catch(error){
res.status(401).json({
    error: new Error("Invalid request!"),
});
}
};