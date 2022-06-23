import bcrypt from 'bcrypt';
import db from '../db.js';

export const handleSignin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json('Incorrect Form Submission');
    }

    return db.select('email', 'hash').from('login').where('email', '=', email).then(data => {
        const isValid = bcrypt.compare(password, data[0].hash);

        if (isValid) {
            return db.select('*').from('users').where('email', '=', email).then(user => res.json(user[0])).catch(err => {
                return res.status(400).json('Unable to Get User');
            });
        } else {
            return res.status(400).json('Wrong Credentials');
        }
    }).catch(err => res.status(400).json('Unable To Sign In'));
};