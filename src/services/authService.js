const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const tokens = {};

const validUser = async (username, password, role = 'CUSTOMER') => {
    try {
        const query = `select password from ${role === 'CUSTOMER' ? 'customer' : 'staff'} where username = ?`;
        const user = await db.execute(query, [username])
        if (user[0][0]) {
            return bcrypt.compareSync(password, user[0][0].password)
        }
        return false
    } catch (error) {
        throw error
    }
}

const accessToken = async (username, role) => {
    try {
        const token = jwt.sign(
            {
                username,
                role,
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h'}
        )
        tokens[username] = token;
        return token;
    } catch (error) {
        throw error;
    }
}

const verifyToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(tokens[decoded.username] === token){
            return {
                username: decoded.username,
                role: decoded.role,
            }
        }
        return undefined;

    } catch (error) {
        throw error
    }
}

const delToken = async (username) => {
    try {
        delete tokens[username]
    } catch(error) {
        throw error;
    }
}

module.exports = {
    validUser,
    accessToken,
    verifyToken,
    delToken,
}