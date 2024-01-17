const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../../config/db');

router.use(express.json());

router.get('/', async (req, res) => {
   try {
    const search = req.query.movie;
    const searchQuery = `SELECT * FROM contents WHERE LOWER(movie) LIKE LOWER('%${search}%')`;

    db.query(searchQuery, (error, results) => {
        if(error) {
            throw error;
        }

        const movieList = results.map(result => result.movie);

        res.json({ movies: movieList });
    })
   } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error '});
   }
});

module.exports = router;