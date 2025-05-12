const sha1 = require("sha1");


module.exports = {
    generateToken: (userId) => {
        const token = sha1(userId + new Date().getTime());
        return token;
    }
    ,
    hashingPassword: (password) => {
        return sha1(password);
    }
    ,
    
}