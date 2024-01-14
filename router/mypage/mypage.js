const express = require('express');
const router = express.Router();
const db = require('../../config/db');

router.use(express.json());

router.get('/', (req, res) => {
  const userEmail = req.query.email; // 마이페이지를 조회할 사용자의 이메일

  // 사용자 정보 조회 쿼리
  const getUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(getUserQuery, [userEmail], (error, results) => {
    if (error) {
      console.error('MySQL query error:', error);
      return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }

    if (results.length === 0) {
      console.log("해당 사용자를 찾을 수 없습니다.");
      return res.status(404).json({ error: '해당 사용자를 찾을 수 없습니다.' });
    }

    const user = results[0];

    // 마이페이지 정보를 클라이언트에게 전달
    const mypageData = {
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      oneliner: user.oneliner,
      profileImage: user.profileImage,
    };

    res.status(200).json({ success: true, data: mypageData });
  });
});

module.exports = router;
