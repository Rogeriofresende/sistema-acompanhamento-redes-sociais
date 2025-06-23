const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const userId = 'user-integration-email';
  const hash = '$2b$10$u9DwgrzfpOw98tzVjRD3defylIlPgE4Jkkk/TKXPJEAnmaacWy4gO';
  await prisma.user.update({
    where: { id: userId },
    data: { password: hash },
  });
  console.log('Senha atualizada com sucesso para o usuário:', userId);
  await prisma.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); }); 