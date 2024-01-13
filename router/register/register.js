const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const multer = require('multer');

router.use(express.json());

// Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('profileImage'), (req, res) => {
  const { email, password, firstname, lastname, oneliner } = req.body;
  const profileImage = req.file ? req.file.filename : null; // 업로드된 파일명

  // 사용자가 이미 존재하는지 확인
  const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUserQuery, [email], (error, results) => {
    if (error) {
      console.error('MySQL query error:', error);
      return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }

    if (results.length > 0) {
      console.log("이미 존재하는 사용자입니다.");
      return res.status(400).json({ error: '이미 존재하는 사용자입니다.' });
    }

    // 존재하지 않으면 새로운 사용자 추가
    const insertUserQuery = 'INSERT INTO users (email, password, firstname, lastname, oneliner, profileImage) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(insertUserQuery, [email, password, firstname, lastname, oneliner, profileImage], (error) => {
      if (error) {
        console.error('MySQL query error:', error);
        return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
      }
      console.log('회원가입이 완료되었습니다.');
      res.status(201).json({ success: true, message: '회원가입이 완료되었습니다.' });
    });
  });
});

module.exports = router;
