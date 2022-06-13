const express = require('express');
const {addReport, getAllReport
      } = require('../controllers/reportController');

const router = express.Router();

router.post('/report/addReport', addReport);
router.get('/reports/', getAllReport);

module.exports = {
    routes: router
}