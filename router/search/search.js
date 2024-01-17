const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../../config/db');

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        let query;
        if (req.query.movie) {
            const search = req.query.movie;
            query = `SELECT * FROM contents WHERE LOWER(movie) LIKE LOWER('%${search}%')`;
        } else {
            query = `SELECT * FROM contents`; // 검색어가 없으면 모든 영화 반환
        }

        db.query(query, (error, results) => {
            if (error) {
                throw error;
            }

            const movieList = results.map(result => result.movie);

            res.json({ movies: results });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;