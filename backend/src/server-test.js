console.log('🚀 TESTE: Iniciando server-test.js');

console.log('🔄 TESTE: Importando Express...');
const express = require('express');
console.log('✅ TESTE: Express importado');

console.log('🔄 TESTE: Criando app...');
const app = express();
console.log('✅ TESTE: App criado');

console.log('🔄 TESTE: Configurando middlewares básicos...');
app.use(express.json());
console.log('✅ TESTE: Middlewares configurados');

console.log('🔄 TESTE: Criando rota de teste...');
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando!' });
});
console.log('✅ TESTE: Rota criada');

const PORT = 1717;
console.log('🔄 TESTE: Iniciando servidor na porta', PORT);
app.listen(PORT, () => {
  console.log('🎉 TESTE: Backend funcionando em http://localhost:' + PORT);
  console.log('🌟 TESTE: Teste com curl http://localhost:' + PORT + '/health');
}); 