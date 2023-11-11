import 'dotenv/config';
import express from 'express';
import translateRoute from './routes/translateRoute';
import dictionaryRoute from './routes/dictionaryRoute';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.use('/translate', translateRoute);
app.use('/dictionary', dictionaryRoute);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});