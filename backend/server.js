const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('task manager api');
});

app.listen(4000, () => {
  console.log('server on port 4000');
});
