const crypto = require('crypto'); // module available by default no need to install

function generatePassword(password){
    let salt = crypto.randomBytes(32).toString('hex');
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return {salt, hash};
}

// in this functions value 1000 is iteration count it should be min 1000. as max as secure. 64 is key length

function validatePassword(password, hash, salt){
    let hashVerify = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}

module.exports.generatePassword = generatePassword;
module.exports.validatePassword = validatePassword;

// exports = generatePassword; is also valid but note that anyfuether export will rewrite it.