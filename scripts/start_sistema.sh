#!/bin/bash

# Caminho absoluto para o diretório do projeto
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Inicia o backend em background
cd "$ROOT_DIR/backend"
echo "Iniciando backend..."
npm install
yarn install 2>/dev/null # caso use yarn
nohup node index.js > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend rodando (PID $BACKEND_PID)"

# Inicia o frontend em background
cd "$ROOT_DIR/polymet-app"
echo "Iniciando frontend..."
npm install
yarn install 2>/dev/null # caso use yarn
# Detecta porta livre para o Vite
PORT=5173
while lsof -i :$PORT >/dev/null 2>&1; do
  PORT=$((PORT+1))
done
export PORT
nohup npm run dev -- --port $PORT > frontend.log 2>&1 &
FRONTEND_PID=$!
echo "Frontend rodando (PID $FRONTEND_PID) na porta $PORT"

# Exibe o valor de VITE_GOOGLE_CLIENT_ID
if [ -f .env ]; then
  echo "\n[DEBUG] VITE_GOOGLE_CLIENT_ID no .env do frontend:"
  grep VITE_GOOGLE_CLIENT_ID .env || echo "(não encontrado)"
else
  echo "\n[DEBUG] Arquivo .env do frontend não encontrado."
fi

# Aguarda o frontend subir (ajuste o tempo se necessário)
sleep 5

# Abre o frontend no navegador padrão na porta correta
URL="http://localhost:$PORT"
if which xdg-open > /dev/null; then
  xdg-open "$URL"
elif which open > /dev/null; then
  open "$URL"
else
  echo "Abra manualmente: $URL"
fi

# Mensagem final
echo "\nSistema iniciado! Backend em http://localhost:4000 | Frontend em $URL"
echo "Para parar, mate os processos: $BACKEND_PID (backend), $FRONTEND_PID (frontend)"
echo "\n[DEBUG] Para testar o login Google do zero, limpe o localStorage do navegador (F12 > Application > Local Storage > http://localhost:$PORT > Remover chaves lanceiessa_user e lanceiessa_token) ou use janela anônima."
echo "[DEBUG] No console do navegador, digite: import.meta.env.VITE_GOOGLE_CLIENT_ID para conferir o valor em tempo de execução." 