import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import { handleRegister } from './controllers/register.js';
import { handleSignin } from './controllers/signin.js';
import { handleProfile } from './controllers/profile.js';
import { handleApiCall, handleImage } from './controllers/image.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.disabled('x-powered-by');

app.use(express.json());
app.use(cors());

app.post('/signin', handleSignin);
app.post('/register', handleRegister);
app.put('/image', handleImage);
app.post('/imageurl', handleApiCall);
app.get('/profile/:id', handleProfile);

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
});