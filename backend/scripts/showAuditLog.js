const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function showAuditLog() {
  const logs = await prisma.auditLog.findMany({
    where: { action: 'LOGOUT' },
    orderBy: { timestamp: 'desc' },
    take: 10,
    include: { user: true },
  });
  if (logs.length === 0) {
    console.log('Nenhum registro de audit log LOGOUT encontrado.');
    return;
  }
  for (const log of logs) {
    console.log('---');
    console.log(`Data: ${log.timestamp.toISOString()}`);
    console.log(`Usuário: ${log.userId || '-'} (${log.user?.email || '-'})`);
    console.log(`Ação: ${log.action}`);
    console.log(`Entidade: ${log.entity}`);
    console.log(`ID da Entidade: ${log.entityId || '-'}`);
    console.log(`IP: ${log.ip || '-'}`);
    console.log(`Detalhes: ${log.details ? JSON.stringify(log.details) : '-'}`);
  }
}

showAuditLog().finally(() => prisma.$disconnect()); 