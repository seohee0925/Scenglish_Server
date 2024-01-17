const express = require('express');
const { spawn } = require('child_process');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // multer를 추가해야 합니다

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/audios/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
  
router.post('/evaluate', upload.single('audio'), async (req, res) => {
    const script = req.body;
    const openApiURL = 'http://aiopen.etri.re.kr:8000/WiseASR/Pronunciation';
    const accessKey = '39847fbc-3e94-465f-8b84-aa1444eceb24';
    const languageCode = 'english';

    // 오디오 파일 경로
    const audioFilePath = req.file.path;
    const timeStamp = Date.now();
    const outputFilePath = path.join(__dirname, `../../public/audios/output_${timeStamp}.pcm`);

    try {
        await convertAudio(audioFilePath, outputFilePath);
    } catch (error) {
        console.error('Audio conversion error:', error);
        return res.status(500).send('Audio conversion failed.');
    }

    const audioData = fs.readFileSync(outputFilePath, { encoding: 'base64' });

    const requestJson = {
        'argument': {
            'language_code': languageCode,
            'script': script, // 필요한 스크립트
            'audio': audioData
        }
    };

    try {
        const response = await axios.post(openApiURL, requestJson, {
            headers: { 'Content-Type': 'application/json', 'Authorization': accessKey }
        });
        console.log('responseCode = ' + response.status);
        console.log('responseBody = ' + response.data);
        res.status(200).json({ success: true, body: response.data });
    } catch (error) {
        console.error('Error in API request:', error);
        res.status(500).send('API request failed.');
    }
    
    
});

function convertAudio(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        const ffmpeg = spawn('ffmpeg', [
            '-i', inputPath,
            '-ar', '16000',
            '-ac', '1',
            '-sample_fmt', 's16',
            '-f', 's16le',
            outputPath
        ]);

        ffmpeg.stderr.on('data', (data) => {
            console.error(`ffmpeg stderr: ${data}`);
        });

        ffmpeg.on('close', (code) => {
            if (code !== 0) {
                reject(`ffmpeg process exited with code ${code}`);
            } else {
                resolve();
            }
        });
    });
}


module.exports = router;
