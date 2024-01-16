const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// MySQL 연결 설정
const db = require('./config/db');

const router = require('./router/index');
app.use(cors());

app.use('/public', express.static('public'))
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});