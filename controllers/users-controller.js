const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const mysql = require('../services/mysql')

module.exports = {
    login: async (req, res, next)  => { 
        try {
            const user = await mysql.execute('SELECT * FROM users WHERE email = ?;', [req.body.email]);
            if( user.length === 0 ) {
                const result = await  mysql.execute('INSERT INTO users (email) VALUES (?);', [req.body.email]);
                function userData () {
                    const {email} = req.body;
                    return { email };
                };
                const token = await jwt.sign(userData(), 'any,SecreteKey', {
                    expiresIn: "1h"
                });
                const response = {
                    message: 'Authenticated successfully',
                    token
                }
                res.status(200).send(response);
            }
                function userData () {
                    const {email} = user[0];
                    return { email };
                };
                const token = await jwt.sign(userData(), 'any,SecreteKey', {
                    expiresIn: "1h"
                });
                const response = {
                    message: 'Authenticated successfully',
                    token
                }
                res.status(200).send(response);
        } catch (error) {
            return res.status(500).send(error)
        }
    }
}