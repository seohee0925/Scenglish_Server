const express = require('express');
const router = express.Router();
const db = require('../../config/db');
const multer = require('multer');

router.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// 마이페이지 정보 조회
router.get('/', (req, res) => {
  const userEmail = req.query.email;

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

router.put('/', upload.single('profileImage'), (req, res) => {
    const { firstname, lastname, oneliner } = req.body;
    const profileImage = req.file ? req.file.filename : null;

    const userEmail = req.query.email;

    // 사용자의 존재 여부 확인
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';

    db.query(checkUserQuery, [userEmail], (error, checkResults) => {
        if (error) {
            console.error('MySQL query error:', error);
            return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
        }

        if (checkResults.length === 0) {
            console.log("해당 사용자를 찾을 수 없습니다.");
            return res.status(404).json({ error: '해당 사용자를 찾을 수 없습니다.' });
        }

        let updateValues = [];
        let updateParams = [];

        if (firstname) {
            updateValues.push('firstname = ?'); // 배열에 값 추가
            updateParams.push(firstname);
        }

        if (lastname) {
            updateValues.push('lastname = ?');
            updateParams.push(lastname);
        }

        if (oneliner) {
            updateValues.push('oneliner = ?');
            updateParams.push(oneliner);
        }

        if (profileImage) {
            updateValues.push('profileImage = ?');
            updateParams.push(profileImage);
        }

        // 필드가 입력된 경우에만 업데이트 수행
        if (updateValues.length > 0) {
            const updateUserQuery = `UPDATE users SET ${updateValues.join(', ')} WHERE email = ?`;

            db.query(updateUserQuery, [...updateParams, userEmail], (error, updateResults) => {
                if (error) {
                    console.error('MySQL query error:', error);
                    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
                }

                // 업데이트 후 사용자 정보 조회
                const getUserQuery = 'SELECT * FROM users WHERE email = ?';
                db.query(getUserQuery, [userEmail], (error, selectResults) => {
                    if (error) {
                        console.error('MySQL query error:', error);
                        return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
                    }

                    const user = selectResults[0];

                    const mypageData = {
                        firstname: user.firstname,
                        lastname: user.lastname,
                        oneliner: user.oneliner,
                        profileImage: user.profileImage,
                    };

                    res.status(200).json({ success: true, data: mypageData });
                    console.log('마이페이지 정보가 수정되었습니다.');
                });
            });
        } else {
            // 필드가 입력되지 않은 경우
            console.log('수정할 필드가 입력되지 않았습니다.');
            return res.status(400).json({ error: '수정할 필드가 입력되지 않았습니다.' });
        }
    });
});

module.exports = router;