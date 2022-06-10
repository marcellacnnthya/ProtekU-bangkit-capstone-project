'use strict';
const firebase = require('../db');
const Report = require('../middleware/report');
const firestore = firebase.firestore();

//POST
const addReport = async (req, res, next) => {
    try {
        const data = req.body;
		if (!req.body.nameReporter || !req.body.emailReporter || !req.body.description  ||
		!req.body.dateReport || !req.body.locationReport) {
			return res.status(442).json({
				nameReporter: "Masukkan ulang nama anda",
				emailReporter: "Masukkan ulang email",
				description:"Masukkan ulang deskripsi kejadian",
				dateReport:"Masukkan ulang tanggal kejadian",
				locationReport:"Masukkan ulang lokasi kejadian"
			});
		}
		await firestore.collection('report').doc().set(data);
		res.send('Laporan anda berhasil dikirim!');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//GET All Report
const getAllReport = async (req, res, next) => {
    try {
        const reports = await firestore.collection('report');
        const data = await reports.get();
        const reportsArray = [];
        if(data.empty) {
            res.status(404).send('Laporan tidak ditemukan');
        }else {
            reports.get().then((querySnapshot) => {
			const reportsArray = [];
			querySnapshot.forEach((doc) => {
				reportsArray.push ({ 
					dateReport: doc.data().dateReport,
					description: doc.data().description, 
					locationReport: doc.data().locationReport
				})
			})
			res.send(reportsArray);
			})
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addReport,
    getAllReport
}