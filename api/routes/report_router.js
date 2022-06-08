const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const db = require('../lib/db.js');

router.post('/addReport', (req, res, next) => {
  db.query(
	 `INSERT INTO report (reportId, userId, nameReport, emailReport, description, dateReport, locationReport, imageReport) 
     VALUES ('${uuid.v4()}', (SELECT id FROM users WHERE email = ${db.escape(req.body.emailReport)}), ${db.escape(req.body.nameReport)}, ${db.escape(req.body.emailReport)}, ${db.escape(req.body.description)}, ${db.escape(req.body.dateReport)}, 
	 ${db.escape(req.body.locationReport)}, ${db.escape(req.body.imageReport)})`,
    (err, result) => {
		if (err) {
			return res.status(500).send({
			msg: 'Email yang anda masukkan harus sama dengan email akun ini!'
			});
		} else {
			return res.status(201).send({
                  msg: 'Form laporan anda berhasil dikirim!'
			});
        }
      
	}
  );
});

router.get('/:reportId', (req, res, next)=>{
	db.query( 
		 `SELECT * FROM report INNER JOIN users WHERE report.userId = users.id;`,
		 (err, result) => {
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


 
module.exports = router;