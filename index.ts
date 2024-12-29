import express, { Application, Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from "cheerio";
import path from 'path';
import dotenv from 'dotenv';
import errorHandler from './error';
import { setSecureHeaders } from "./secureHeaders";
import nlp from 'compromise';
import Three from "compromise/types/view/three";
import plg from 'compromise-speech';
nlp.extend(plg);
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 6021;
const URL = process.env.PROXY || process.env.URL;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(setSecureHeaders);
app.disable("x-powered-by");

const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
let wordOfDay: Array<{ word: string, definition: string, pronunciation: string }> = [];

app.use(express.static(path.join(__dirname, '.', 'public')));
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'));
});

app.get('/words', async (req: Request, res: Response) => {
    try {
        const response = await axios({
            method: 'GET',
            url: URL,
            headers: {
                'User-Agent': userAgent,
                'Accept-Encoding': 'identity',
            }
        });

        const $ = cheerio.load(response.data.data);

        if (wordOfDay.length > 0) {
            wordOfDay = [];
        }

        const post = $('.section #shared_section');
        const word = post.find('#random_word').eq(0).text().trim() || 'Not Found';
        const definition = post.find('#random_word_definition').eq(0).text().replace('\n', '').trim() || 'Not Found';

        // @ts-ignore
        let doc: Three = nlp(word);

        // @ts-ignore
        const pronounced = doc.soundsLike();
        const pronounce = pronounced || 'Not Found';

        wordOfDay.push({
            word: decodeURI(word.charAt(0).toUpperCase() + word.slice(1)),
            definition: decodeURI(definition.charAt(0).toUpperCase() + definition.slice(1)).trim(),
            pronunciation: decodeURI(pronounce)
        });

        res.json(wordOfDay);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.json(dummydata());
    }
});

function dummydata(): object {
    return {
        word: 'Not Found',
        definition: 'Not Found',
        pronunciation: 'Not Found'
    };
}

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Resource not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});