// middleware/users.js

const jwt = require("jsonwebtoken");

module.exports = {
  validateRegister: (req, res, next) => {
    /* username min length 3
    if (!req.body.username || req.body.username.length < 3) {
      return res.status(400).send({
        msg: 'Please enter a username with min. 3 chars'
      });
    }
    */

    // full name 
    if (!req.body.name ) {
      return res.status(400).send({
        msg: 'Please enter your Full Name'
      });
    }   
    
    // email
    if (!req.body.email){
      return res.status(400).send({
        msg: 'Please enter your right Email'
      });
    }

    // phoneNumber
    if (!req.body.phoneNumber){
      return res.status(400).send({
        msg: 'Please enter your right phone Number'
      });
    }

    // gender
    if (!req.body.gender){
      return res.status(400).send({
        msg: 'Please pick your Gender'
      });
    }

    // emergencyNumber1
    if (!req.body.emergencyNumber1 || req.body.emergencyNumber1.length < 10) {
      return res.status(400).send({
        msg: 'Please enter first emergency number with min. 10 digit'
      });
    }

    // emergencyNumber2
    if (!req.body.emergencyNumber2 || req.body.emergencyNumber2.length < 10) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 10 chars'
      });
    }

    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 6 chars'
      });
    }

    // password (repeat) does not match
    if (
      !req.body.password_repeat ||
      req.body.password != req.body.password_repeat
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
    }

    next();
  }
};

// middleware/users.js

isLoggedIn: (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(
      token,
      'SECRETKEY'
    );
    req.userData = decoded;
    next();
  } catch (err) {
    return res.status(401).send({
      msg: 'Your session is not valid!'
    });
  }
}