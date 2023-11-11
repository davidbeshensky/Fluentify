import 'dotenv/config';
import express from 'express';
import axios from 'axios';

const router = express.Router();


interface Phonetic {
    text: string;
    audio?: string;
}

interface Definition {
    partOfSpeech: string;
    definitions: {
        definition: string;
        example: string;
        synonyms: string[];
        antonyms: string[];
    }[];
}

interface DictionaryEntry {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    origin: string;
    meanings: Definition[];
}

/*
This API endpoint is used to get the dictionary entry of a word.
Request
POST http://localhost:3000/getDictionaryEntry
Content-Type: application/json

Body: 
{
    "word": "hello"
}
*/

router.post('/', async (req, res) => {
    const { word } = req.body;

    if (!word) {
        return res.status(400).json({ error: 'Missing "word" parameter in the request body' });
    }

    try {
        // Make a request to the Dictionary API
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        // Extract relevant information from the API response
        const formattedResponse: DictionaryEntry = {
            word: response.data[0].word,
            phonetic: response.data[0].phonetic || '', // Assuming phonetic is always present
            phonetics: response.data[0].phonetics.map((phonetic: Phonetic) => ({
                text: phonetic.text,
                audio: phonetic.audio || '',
            })),
            origin: response.data[0].origin || '',
            meanings: response.data[0].meanings.map((meaning: Definition) => ({
                partOfSpeech: meaning.partOfSpeech,
                definitions: meaning.definitions.map((definition) => ({
                    definition: definition.definition,
                    example: definition.example,
                    synonyms: definition.synonyms || [],
                    antonyms: definition.antonyms || [],
                })),
            })),
        };

        res.status(200).json(formattedResponse);
    } catch (error: any) {
        console.error('Error fetching data from Dictionary API:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;