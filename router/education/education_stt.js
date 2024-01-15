const express = require('express');
const router = express.Router();
const db = require('../../config/db');

const fs = require('fs');
const axios = require('axios');

const openApiURL = 'http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation';
const accessKey = '39847fbc-3e94-465f-8b84-aa1444eceb24';
const languageCode = 'english';
const script = 'my name is seohee';
const audioFilePath = 'public/audios/test1.m4a';

const audioData = fs.readFileSync(audioFilePath);

const requestJson = {
    'argument': {
        'language_code': languageCode,
        'script': script,
        'audio': audioData.toString('base64')
    }
};

const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + accessKey
};

axios.post(openApiURL, requestJson, { headers })
    .then(response => {
        console.log('responseCode = ' + response.status);
        console.log('responseBody = ' + JSON.stringify(response.data));
    })
    .catch(error => {
        console.error('Error:', error.message);
    });

module.exports = router;
