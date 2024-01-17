const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.use(express.json());

// mypage/getMovie
router.get('/getMovie', (req, res) => {
    const userEmail = req.query.email;

    const getMovieQuery = `
        SELECT users_contents.*, contents.*
        FROM users_contents
        JOIN contents ON users_contents.content_id = contents.contents_id
        WHERE users_contents.email = ?;
    `;

    db.query(getMovieQuery, [userEmail], (error, results) => {
        if(error) {
            console.error('Database error:', error);
            res.status(500).json({ error: 'Internal Server error' });
        } else {
            if (results && results.length > 0) {
                res.status(200).json(results);   
            } else {
                res.status(404).json({ error: 'Movie not found '});
            }
        }
    });    
});

module.exports = router;