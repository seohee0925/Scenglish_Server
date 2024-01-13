const express = require('express');
const app = express();
const port = 3000;

// MySQL 연결 설정
const db = require('./config/db');

const router = require('./router/index');
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});