const jwt = require("jsonwebtoken");
const config = require("../classes/Server").config

const JWT_SECRET = process.env.JWT_SECRET || "thisisnotsecreet",

class JWToken {
    static async createToken(data) {
        let token = await jwt.sign(
            data,
            JWT_SECRET,
            {
                expiresIn: config.JWT.expires,
            }
        );
        return token;
    }

    static async verifyToken(token) {
        try {
            let decoded = await jwt.verify(token, JWT_SECRET);
            return { error: false, vaule: decoded };
        } catch (e) {
            return { error:true, vaule: e.message };
        }
    }
}

module.exports = JWToken