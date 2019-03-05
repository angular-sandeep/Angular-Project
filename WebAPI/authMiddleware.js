const userModel = require("./model/users");
const roleModel = require("./model/roles");
const loginStatusModel = require('./model/loginstatus');
// const iplocate = require('node-iplocate');

const jwt = require("jsonwebtoken");
const tokenSetting = require("./config/token");

module.exports = function() {
  return function(req, res, next) {

    
    //console.log(req.connection.remoteAddress);
    // iplocate('10.0.0.87').then((results) => {
    //   console.log(results);
    // });
    
    // "REQUEST" other than "CREATE USER" or "AUTH USER"
    if (!(req.url == "/api/user/auth")) {

      /* #region "FOR PRODUCT ROUTES" */
      //console.log(req.headers);
      
      // token data reading
      let tokenValue = req.headers.authorization.split(" ")[1];


      if (tokenValue === undefined || tokenValue === "") {
        res.send({
          status: 401,
          authenticated: false,
          message: "authentication failed"
        });
      } else {
        // verifying token information
        jwt.verify(tokenValue, tokenSetting.jwtSecret, function(err, decoded) {
          if (err) {
            console.log("in auth error");
            res.send({
              status: 500,
              authenticated: false,
              message: "Token verification failed"
            });
          }
          next();
        });
      }

      /* #endregion */
    } else {
      // reading username and password for request object
      let user = {
        UserName: req.body.UserName,
        Password: req.body.Password
      };

      // user credentials checking
      userModel.findOne(
        {
          $and: [
            { UserName: req.body.UserName },
            { Password: req.body.Password }
          ]
        },
        (err, data) => {
          //userModel.isAuthenticate(user, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          if (data != undefined) {
            
            if (data.isAuthorized === "Approved") {

              // let loginStatus = {
              //   UserName: data.UserName,
              //   LoginForm: req.connection,
              //   IPAddress: req.connection.remoteAddress
              // }
              // loginStatusModel.create().exec((err,d) => {
              //   if(err)
              //   {
              //     console.log(err);
              //     return
              //   }
              //   console.log(d);
              // });
              // token creation
              var token = jwt.sign({ user }, tokenSetting.jwtSecret, {
                expiresIn: 3600
              });
              let userId = data.UserId;
              let username = data.UserName;

              roleModel.findOne({ RoleId: data.RoleId }).exec((err, data) => {
                // TOKEN SEND TO CLIENT
                res.send({
                  status: 200,
                  token: `Bearer ${token}`,
                  role: data.RoleType,
                  UserId: userId,
                  UN: username 
                });
              });
            }
            else {
              res.statusCode = 403;
              res.send({ status: res.statusCode, message: "Unapproved user" });
              res.end();
            }
          } else {
            res.statusCode = 401;
            res.send({ status: res.statusCode, message: "Unauthorized user" });
            res.end();
          }
        } 
      );
      /* #endregion */
    }
  };
};
