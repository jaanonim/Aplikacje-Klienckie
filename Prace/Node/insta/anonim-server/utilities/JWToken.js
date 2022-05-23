const jwt = require("jsonwebtoken");
const CONFIG = require("../classes/Server").config;

const JWT_SECRET = process.env.JWT_SECRET || "thisisnotsecreet";

class JWToken {
    static async createToken(data, config = CONFIG.JWT) {
        let token = await jwt.sign({ data }, JWT_SECRET, config);
        return token;
    }

    static async verifyToken(token) {
        try {
            let decoded = await jwt.verify(token, JWT_SECRET);
            return { error: false, value: decoded };
        } catch (e) {
            return { error: true, value: e.message };
        }
    }
}

module.exports = JWToken;
