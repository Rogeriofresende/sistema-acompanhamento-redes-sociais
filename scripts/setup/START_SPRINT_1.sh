#!/bin/bash

echo "🚀 INICIANDO SPRINT 1: FUNDAÇÃO DE DADOS"
echo "========================================"
echo ""
echo "Este script irá:"
echo "1. Instalar dependências do banco de dados"
echo "2. Criar estrutura de diretórios"
echo "3. Gerar arquivos base"
echo ""
echo "Pressione ENTER para continuar ou CTRL+C para cancelar..."
read

# 1. Instalar dependências
echo "📦 Instalando dependências do Sequelize e PostgreSQL..."
cd backend
npm install --save sequelize pg pg-hstore
npm install --save-dev sequelize-cli
npm install --save bcryptjs crypto-js

# 2. Criar estrutura de diretórios
echo "📁 Criando estrutura de diretórios..."
mkdir -p src/models
mkdir -p src/migrations
mkdir -p src/seeders
mkdir -p src/services
mkdir -p src/config

# 3. Inicializar Sequelize
echo "🔧 Inicializando Sequelize..."
npx sequelize-cli init

# 4. Criar arquivo de configuração do banco
echo "📝 Criando arquivo de configuração..."
cat > src/config/database.js << 'EOF'
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'lanceiessa_dev',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: console.log
  },
  test: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'lanceiessa_test',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
EOF

# 5. Adicionar variáveis ao .env
echo ""
echo "📝 Adicionando variáveis de banco ao .env..."
echo "" >> .env
echo "# Database Configuration" >> .env
echo "DB_USERNAME=postgres" >> .env
echo "DB_PASSWORD=postgres" >> .env
echo "DB_NAME=lanceiessa_dev" >> .env
echo "DB_HOST=localhost" >> .env

echo ""
echo "✅ Sprint 1 iniciada com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "1. Certifique-se de ter PostgreSQL instalado e rodando"
echo "2. Crie o banco de dados: createdb lanceiessa_dev"
echo "3. Execute as migrations: npx sequelize-cli db:migrate"
echo ""
echo "📚 Documentação completa em: SPRINT_1_TECHNICAL_SPEC.md" 