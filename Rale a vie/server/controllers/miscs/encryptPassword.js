const bcrypt = require('bcrypt');

const encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);

    // 1 - encrypt the password
    // password + salt
    const cryptedPwd = await bcrypt.hash(password, salt);

    return cryptedPwd;
};

module.exports = encryptPassword;
