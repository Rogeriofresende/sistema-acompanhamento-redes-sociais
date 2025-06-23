const db = require('./models');
const logger = require('./config/logger');

async function testDatabase() {
  try {
    console.log('🔍 Testando conexão com o banco de dados...\n');
    
    // Testar conexão
    const connected = await db.testConnection();
    if (!connected) {
      throw new Error('Não foi possível conectar ao banco de dados');
    }
    
    console.log('\n📊 Sincronizando modelos...\n');
    
    // Sincronizar modelos (criar tabelas)
    // Use { force: true } apenas em desenvolvimento para recriar tabelas
    await db.syncModels({ alter: true }); // alter: true atualiza tabelas existentes
    
    console.log('\n✅ Banco de dados configurado com sucesso!');
    console.log('\n📋 Modelos disponíveis:');
    console.log('- User');
    console.log('- YouTubeToken');
    console.log('- YouTubeChannel');
    console.log('- Guest');
    
    console.log('\n🚀 Sistema pronto para uso!');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    logger.error('Erro ao configurar banco de dados:', error);
    process.exit(1);
  }
}

// Executar teste
testDatabase(); 