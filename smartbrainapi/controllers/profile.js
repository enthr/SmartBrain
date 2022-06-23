import db from '../db.js';

export const handleProfile = (req, res) => {
    const { id } = req.params;

    return db.select('*').from('users').where({ id }).then(user => {
        if (user.length) {
            return res.json(user[0]);
        } else {
            return res.status(400).json('No Such User Exists');
        }
    }).catch(err => res.status(400).json('Error Getting User'));
};