const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello mmaaaaa joba!');
});

app.get('/api/courses', (req, res) => {
  res.send([1, 2, 3]);
});

const port = process.env.PORT || 6005;
app.listen(port, () => {
  console.log(`Listening on port...${port}`);
});
