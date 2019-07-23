const express = require('express');
const router = require('./routes');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use('/api/user', router);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
