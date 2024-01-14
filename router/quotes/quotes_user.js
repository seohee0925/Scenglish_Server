const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.use(express.json());

// /quotes/watched
router.post('/watched', async (req, res) => {
  try {
    const { userEmail, movieId } = req.body;

    const queryString = `
      INSERT INTO users_quotes (user_email, user_movie)
      VALUES ('${userEmail}', ${movieId});
    `;

    await db.query(queryString);

    res.status(201).json({ success: true, message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

module.exports = router;
