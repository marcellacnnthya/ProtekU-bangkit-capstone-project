class User {
    constructor(userId, fullName, email, password,
        phoneNumber, gender, emergencyNumber1, emergencyNumber2) {
            this.userId = userId;
            this.fullName = fullName;
            this.email = email;
            this.password = password;
            this.gender = gender;
            this.phoneNumber = phoneNumber;
            this.emergencyNumber1 = emergencyNumber1;
            this.emergencyNumber2 = emergencyNumber2;
    }
}


module.exports = User;