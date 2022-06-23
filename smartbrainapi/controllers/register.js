import bcrypt from 'bcrypt';
import db from '../db.js';

export const handleRegister = async (req, res) => {
    const { name, email, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json('Incorrect Form Submission');
    }

    const hashPass = await bcrypt.hash(password, 10);

    return db.transaction(trx => {
        return trx.insert({
            hash: hashPass,
            email: email
        }).into('login').returning('email').then(loginEmail => {
            return trx('users').returning('*').insert({
                name: name,
                email: loginEmail[0].email,
                joined: new Date()
            }).then(user => {
                return res.json(user[0]);
            });
        }).then(trx.commit).catch(trx.rollback);
    }).catch(err => res.status(400).json('Unable To Register'));;
};