const bcrypt = require("bcrypt");

class PassCrypto {
    static async encrypt(password) {
        return await bcrypt.hash(password, 10);
    }

    static async veryfiy(userpass, encrypted) {
        return await bcrypt.compare(userpass, encrypted);
    }
}

module.exports = PassCrypto;
