const express = require('express');
const app = express();
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.listen(4000, () => {
  console.log('Express puro rodando em http://localhost:4000');
}); 