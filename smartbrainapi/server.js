import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';

const app = express();

app.disabled('x-powered-by');

const database = {
    users: [{
        id: '123',
        name: 'John',
        email: 'john@gmail.com',
        password: '12345',
        entries: 0,
        joined: new Date()
    },
    {
        id: '124',
        name: 'Sally',
        email: 'sally@gmail.com',
        password: '12345',
        entries: 0,
        joined: new Date()
    }
    ]
};

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    return res.json(database.users);
});

app.post('/signin', (req, res) => {
    const { email, password } = req.body;

    const match = bcrypt.compare(password, database.users[database.users.length - 1].password);

    if (email === database.users[database.users.length - 1].email && match) {
        return res.json({ ...database.users[database.users.length - 1], password: '' });
    } else {
        return res.status(400).json('Error Signing In');
    }

});

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashPass = await bcrypt.hash(password, 10);

    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: hashPass,
        entries: 0,
        joined: new Date()
    });

    return res.json({ ...database.users[database.users.length - 1], password: '' });
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });

    if (!found) {
        return res.statusCode(404).json('No Such User Exists');
    }
});

app.put('/image', (req, res) => {
    const { id } = req.body;
    let found = false;

    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });

    if (!found) {
        return res.statusCode(404).json('No Such User Exists');
    }

});

app.listen(5000, () => {
    console.log('Server is Running on Port 5000');
});