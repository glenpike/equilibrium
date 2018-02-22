var bcrypt   = require('bcrypt-nodejs');

function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

console.log('password for "george" is ', generateHash('george'));
console.log('password for "george" is ', generateHash('lee'));
