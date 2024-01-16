const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../../config/db');
const naverconfig = require('../../config/naverconfig.json')

router.use(express.json());

// education/addHistory
router.post('/addHistory', async (req, res) => {
    const {userEmail, id, num} = req.body;
    const checkExist = 'SELECT * FROM users_contents WHERE email = ? AND content_id = ?';
    db.query(checkExist, [userEmail, id], (error, results) => {
        if (error) {
        console.error('MySQL query error:', error);
        return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
        }

        if (results.length > 0) {
        const user_content = results[0];
        const newNumber = user_content['num_quotes'] + num;
        const updatequery = 'UPDATE users_contents SET num_quotes = ?';
        db.query(updatequery, [newNumber], (error, results) =>{
            if(error){
                console.error('MySQL query error:', error);
                return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
            }
        })
        console.log('update 성공');
        return res.status(200).json({ success: true });
        } else {
            const insertquery = 'INSERT INTO users_contents (email, content_id) VALUES (?, ?)';
            db.query(insertquery, [userEmail, id], (error, results) =>{
                if(error){
                    console.error('MySQL query error:', error);
                    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
                }
            })
            console.log('insert 성공');
            return res.status(200).json({ success: true });
        }
    });
})

// education/addWord
router.post('/addWord', async (req, res) => {
    const { user_email, word } = req.body;

    if (!user_email || !word) {
        return res.status(400).send('User email and vocabulary are required.');
    }

    try {
        // 파파고 API
        const papagoApiUrl = 'https://openapi.naver.com/v1/papago/n2mt';
        const papagoHeaders = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Naver-Client-Id': naverconfig.clientId,
            'X-Naver-Client-Secret': naverconfig.clientSecret,
        };

        // Papago API를 사용하여 영어에서 한글로 번역
        const papagoResponse = await axios.post(
            papagoApiUrl,
            `source=en&target=ko&text=${encodeURIComponent(word)}`,
            { headers: papagoHeaders }
        );

        const koreanDefinition = papagoResponse.data.message.result.translatedText;

        const insertQuery = 'INSERT INTO vocabulary (user_email, word, definition) VALUES (?, ?, ?)';
        await db.query(insertQuery, [user_email, word, koreanDefinition]);

        res.status(200).json({ success: true, message: '단어가 성공적으로 추가되었습니다.' });
    } catch (error) {
        console.error('단어 추가 중 오류:', error);
        res.status(500).json({ success: false, message: '서버 오류로 단어를 추가할 수 없습니다.' });
    }
});

// education/deleteWord
router.post('/deleteWord', async (req, res) => {
    const { user_email, word } = req.body;

    if (!user_email || !word) {
        return res.status(400).send('User email and vocabulary are required.');
    }

    try {
        const deleteQuery = 'DELETE FROM vocabulary WHERE user_email = ? AND word = ?';
        const deleteResult = await db.query(deleteQuery, [user_email, word]);
        
        res.status(200).json({ success: true, message: '단어가 성공적으로 삭제되었습니다.' });
    
    } catch (error) {
        console.error('단어 삭제 중 오류:', error);
        res.status(500).json({ success: false, message: '서버 오류로 단어를 삭제할 수 없습니다.' });
    }
});

// education/getAll
router.get('/getAll', async (req, res) => {
    const userEmail = req.query.email;

    if (!userEmail) {
        return res.status(400).send('User email is required.');
    }

    const selectQuery = 'SELECT word, definition FROM vocabulary WHERE user_email = ?';
    db.query(selectQuery, [userEmail], (error, results) => {
        if (error) {
            console.error('MySQL query error:', error);
            return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
        }

        if (results.length === 0) {
            console.log("해당 사용자를 찾을 수 없습니다.");
            return res.status(404).json({ error: '해당 사용자를 찾을 수 없습니다.' });
        }

        const words = results.map(item => ({  // 'results'가 아니라 'result'로 되어 있던 부분을 'results'로 수정
            word: item.word,
            definition: item.definition
        }));

        return res.status(200).json({ success: true, words });
    });
});

module.exports = router;