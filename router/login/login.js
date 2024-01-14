const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const jwt = require('jsonwebtoken');

router.use(express.json());

router.post('/', (req, res) => {
  const { email, password } = req.body;

  // 사용자가 존재하는지 확인
  const checkUserQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(checkUserQuery, [email, password], (error, results) => {
    if (error) {
      console.error('MySQL query error:', error);
      return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }

    if (results.length > 0) {
      const user = results[0];
      const token = jwt.sign({
        email: user.email, password: user.password
      },
      'senglish', { expiresIn: '3h'}
      );
      console.log('로그인 성공');
      return res.status(200).json({ success: true, token: token });
    } else {
      console.log('이메일 또는 비밀번호가 일치하지 않습니다.');
      return res.status(401).json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }
  });
});

module.exports = router;
