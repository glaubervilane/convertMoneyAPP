const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(cors());

app.get('/convert', async (req, res) => {
  const { base, symbols } = req.query;

  try {
    const response = await fetch(`https://api.fixer.io/latest?base=${base}&symbols=${symbols}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
