const express = require('express');
const {getUser,
       updateUser,
       register,
       login
      } = require('../controllers/userController');

const router = express.Router();


//router.post('/user', addUser);
router.get('/user/:userId', getUser);
router.put('/user/:userId', updateUser);

//authentication
router.post('/register', register);
router.post('/login', login);

module.exports = {
    routes: router
}