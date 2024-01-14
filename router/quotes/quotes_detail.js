const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.use(express.json());

// quotes/getMovieInfo
router.get('/getMovieInfo', (req, res) => {
    const contentsId = req.query.contentsId; // contents Id를 요청받아서 저장 (url과 변수명 일치)
    const query = `
        SELECT contents.*, quotes.*
        FROM contents
        INNER JOIN quotes ON contents.movie = quotes.movie
        WHERE contents_id = ?
    `;

    db.query(query, [contentsId], (error, results, fields) => {
        if(error) {
            console.error('Error fetching movie info:', error);
            res.status(500).json({ error: 'Internal Server error' });
        } else {
            if (results.length > 0) { // 영화 정보 응답
                res.status(200).json(results);
            } else { // 일치하는 영화가 없을 때
                res.status(404).json({ error: 'Movie not found' })
            }
        }
    })
})

module.exports = router;
