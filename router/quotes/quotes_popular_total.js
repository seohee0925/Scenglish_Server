const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.use(express.json());

router.get('/getPopularTotal', (req, res) => {
    const query = 'SELECT content_id, COUNT(content_id) as count FROM users_contents GROUP BY content_id ORDER BY count DESC'
    db.query(query, (error, results) => {
        if(error) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(results);
        }
    });
});

module.exports = router;