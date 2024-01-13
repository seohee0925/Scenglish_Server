const express = require('express');
const app = express();
const port = 3000;

// MySQL 연결 설정
const db = require('./config/db');

const router = require('./router/index');
app.use(router);

app.get('/movie', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://juanroldan1989-moviequotes-v1.p.rapidapi.com/api/v1/quotes',
    params: {movie: "The Avengers"},
    headers: {
      Authorization: 'Token token=yd8WzkWNEEzGtqMSgiZBrwtt',
      'X-RapidAPI-Key': 'e781b9c228mshda9878668a16722p1e4c6djsnba0954e79f41',
      'X-RapidAPI-Host': 'juanroldan1989-moviequotes-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});