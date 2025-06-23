const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Controller para autenticação Google
async function googleSignIn(req, res) {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: 'Token não fornecido.' });

  try {
    // Validação real do token Google
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    // payload.sub = googleId, payload.email, payload.name

    // Busca ou cria usuário
    let user = await prisma.user.findUnique({ where: { googleId: payload.sub } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: payload.email,
          name: payload.name,
          googleId: payload.sub,
        },
      });
    }

    // Gera um token JWT próprio do sistema (opcional)
    const appToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' });

    res.json({ user, token: appToken });
  } catch (err) {
    res.status(401).json({ error: 'Token inválido ou erro de autenticação.', details: err.message });
  }
}

module.exports = { googleSignIn }; 