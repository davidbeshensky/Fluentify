import 'dotenv/config';
import express from 'express';
import * as deepl from 'deepl-node';

const authKey = process.env.DEEPL_API_KEY ?? '';
const translator = new deepl.Translator(authKey);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

/* 
This API endpoint is used to translate text from one language to another.
Request
POST http://localhost:3000/translate
Content-Type: application/json

Body: 
{
    "words": ["", ""],
    "source_lang": "en",
    "target_lang": "jp"
}
*/
app.post('/translate', async (req, res) => {
    const { words, source_lang, target_lang } = req.body;
    console.log('Request Body:', req.body);
    if (!words || !target_lang || !source_lang) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    try {
        const result = await translator.translateText(words, source_lang, target_lang);
        const translatedText = result;
        console.log('DeepL API Response:', result);
        res.status(200).json({ translation: translatedText });
    } catch (error: any) {
        console.error('DeepL API Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

