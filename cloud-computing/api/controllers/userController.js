'use strict';
const { get } = require('express/lib/response');
const firebase = require('../db', 'firebase/auth');
const User = require('../middleware/user');
const firestore = firebase.firestore();

const getUser = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const user = await firestore.collection('user').doc(id);
        const data = await user.get();
        if(!data.exists) {
            res.status(404).send('ID Pengguna tidak ditemukan');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.userId;
        const data = req.body;
        const user =  await firestore.collection('user').doc(id);
        await user.update(data);
        res.send('Profil anda telah diperbarui!');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const register = async (req, res, next) =>{
    const data = req.body;
    if(!req.body.fullName || !req.body.email || !req.body.password || !req.body.gender || !req.body.phoneNumber || !req.body.emergencyNumber1 || !req.body.emergencyNumber2){
        return res.status(442).json({
            fullName: "Masukkan nama lengkap anda",
            email:"Masukkan email anda",
            password:"Masukkan password min. 6 huruf",
            gender:"Pilih jenis kelamin",
            phoneNumber:"Masukkan nomor telephone pribadi",
            emergencyNumber1: "Masukkan nomor emergensi 1",
            emergencyNumber2: "Masukkan nomor emergensi 2",
        });
    }
    await firestore.collection('user').doc().set(data);
    res.send('Registrasi berhasil!');
    firebase.auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((data)=>{
        return res.status(201).json(data);
    }).catch (function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak pwd"){
            return res.status(500).json({error:errorMessage});
        }else{
            return res.status(500).json({error: errorMessage});
        }
    });
};

const login = async (req, res, next) =>{
    if(!req.body.email || !req.body.password){
        return res.status(442).json({
            email:"Masukkan email yang sesuai",
            password:"Masukkan password yang sesuai",
        });
    }
    firebase.auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then((user)=>{
        return res.status(201).json(user);
    })
    .catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/wrong pwd"){
            return res.status(500).json({error:errorMessage});
        }else{
            return res.status(500).json({error: errorMessage});
        }
    });
};

module.exports = {
    getUser,
    updateUser,
    register,
    login
}