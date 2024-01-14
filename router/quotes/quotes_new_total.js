const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.use(express.json());

// quotes/getNewTotal
router.get('/getNewTotal', (req, res) => {
    const query = "SELECT * FROM contents ORDER BY release_date DESC";

    db.query(query, (error, results) => { // 쿼리 결과를 results에 담음
        if (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length > 0) {
                res.json(results);
            } else {
                res.json({ message: 'No data found' });
            }
        }
    });
});

module.exports = router;
