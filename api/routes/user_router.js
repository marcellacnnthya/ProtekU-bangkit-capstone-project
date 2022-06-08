const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');
const userMiddleware = require('../middleware/users.js');


router.post('/register', userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.email
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: 'Email ini telah digunakan!'
        });
      } else {
        // email is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (userId, name, email, password, gender, phoneNumber, emergencyNumber1, emergencyNumber2) VALUES ('${uuid.v4()}', ${db.escape(req.body.name)} , ${db.escape(
                req.body.email)}, ${db.escape(hash)}, ${db.escape(req.body.gender)}, ${db.escape(req.body.phoneNumber)}, ${db.escape(req.body.emergencyNumber1)}, ${db.escape(req.body.emergencyNumber2)})`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err
                  });
                }
                return res.status(201).send({
                  msg: 'Registrasi Berhasil!'
                });
              }
            );
          }
        });
      }
    }
  );
});

// routes/router.js

router.post('/login', (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      }

      if (!result.length) {
        return res.status(401).send({
          msg: 'Email atau Password yang anda input salah!'
        });
      }

      // check password
      bcrypt.compare(
        req.body.password,
        result[0]['password'],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: 'Email atau Password yang anda input salah!'
            });
          }

          if (bResult) {
            const token = jwt.sign({
                email: result[0].email,
                id: result[0].id
              },
              'SECRETKEY', {
                expiresIn: '7d'
              }
            );

            db.query(
              `UPDATE users WHERE userId = '${result[0].userId}'`
            );
            return res.status(200).send({
              msg: 'Log In Berhasil!',
              token,
              user: result[0]
            });
          }
          return res.status(401).send({
            msg: 'Email atau Password yang anda input salah!'
          });
        }
      );
    }
  );
});

router.get('/', (req, res, next)=>{
	db.query( 
		 `SELECT * FROM users;`,
		 (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      } else {
		return res.status(200).send({
		  user: result[0]
        });
      }
	});
});

router.get('/:userId', (req, res, next)=>{
	db.query( 
		 `SELECT * FROM users WHERE userId= ${db.escape(req.params.userId)};`,
		 (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err
        });
      } else {
		return res.status(200).send({
		  user: result[0]
        });
      }
	});
});
		
router.put('/:userId', (req, res, next)=>{
	bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).send({
          msg: err
        });
        } else {
            // has hashed pw => add to database
			db.query( 
			`UPDATE users SET name=${db.escape(req.body.name)}, email=${db.escape(req.body.email)}, password=${db.escape(req.body.password)}, 
			gender=${db.escape(req.body.gender)}, phoneNumber=${db.escape(req.body.phoneNumber)}, emergencyNumber1=${db.escape(req.body.emergencyNumber1)},
			emergencyNumber2=${db.escape(req.body.emergencyNumber2)} WHERE userId= ${db.escape(req.params.userId)};`,
			(err, result) => {
			// user does not exists
				if (err) {
					throw err;
					return res.status(400).send({
					msg: 'Error saat memperbarui profil'
					});
				} else {
					return res.status(200).send({
					msg: 'Profil anda telah diperbarui !'
					});
				}
			}
		);
	}
	});
});

module.exports = router;

