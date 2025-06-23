const app = require('./app');
const logger = require('../logger');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Backend rodando em http://localhost:${PORT}`);
});
