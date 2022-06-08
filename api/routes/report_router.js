const express = require('express');
const uuid = require('uuid');
const router = express.Router();

const db = require('../lib/db.js');

router.post('/addReport', (req, res, next) => {
  db.query(
     `INSERT INTO report (reportId, nameReport, emailReport, description, dateReport, locationReport, imageReport) VALUES ('${uuid.v4()}', 
	 ${db.escape(req.body.nameReport)}, ${db.escape(req.body.emailReport)}, ${db.escape(req.body.description)}, ${db.escape(req.body.dateReport)}, 
	 ${db.escape(req.body.locationReport)}, ${db.escape(req.body.imageReport)})`,
    (err, result) => {
		if (err) {
			return res.status(500).send({
			msg: err
			});
		} else {
			return res.status(201).send({
                  msg: 'Your Report Form has been submitted!'
			});
        }
      
	}
  );
});

router.get('/:reportId', (req, res, next)=>{
	db.query( 
		 `SELECT * FROM report WHERE reportId= ${db.escape(req.params.reportId)};`,
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