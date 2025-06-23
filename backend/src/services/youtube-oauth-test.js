const logger = require('../../logger');
const { google } = require('googleapis');
require('dotenv').config();

const clientId = process.env.YOUTUBE_CLIENT_ID;
const clientSecret = process.env.YOUTUBE_CLIENT_SECRET;
const redirectUri = process.env.YOUTUBE_REDIRECT_URI;

logger.info('YOUTUBE_CLIENT_ID:', clientId);
logger.info('YOUTUBE_CLIENT_SECRET:', clientSecret);
logger.info('YOUTUBE_REDIRECT_URI:', redirectUri);

const oauth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri
);

const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent',
});

logger.info('\n1. Acesse este link no navegador e faça login:');
logger.info(url);

logger.info('\n2. Após autorizar, cole aqui o código da URL (code=...):');

process.stdin.on('data', async (data) => {
  const code = data.toString().trim();
  try {
    const { tokens } = await oauth2Client.getToken(code);
    logger.info('\nTokens recebidos com sucesso!');
    logger.info(tokens);
  } catch (err) {
    logger.error('\nErro ao trocar código por tokens:');
    logger.error(err.response ? err.response.data : err);
  }
  process.exit();
}); 