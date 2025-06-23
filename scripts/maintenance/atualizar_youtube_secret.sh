#!/bin/bash

echo "🔐 ATUALIZANDO CLIENT SECRET DO YOUTUBE"
echo "======================================"
echo ""
echo "Você precisa copiar o Client Secret do OAuth Client 'Sistema Lancei Essa Youtube'"
echo ""
echo "1. Vá para: https://console.cloud.google.com/apis/credentials"
echo "2. Clique em 'Sistema Lancei Essa Youtube'"
echo "3. Copie o Client Secret: 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"
echo ""

# Usar o mesmo secret que já vimos na imagem
YOUTUBE_SECRET="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"

# Atualizar apenas o YOUTUBE_CLIENT_SECRET
sed -i '' "s/YOUTUBE_CLIENT_SECRET=.*/YOUTUBE_CLIENT_SECRET=$YOUTUBE_SECRET/g" backend/.env

echo "✅ YouTube Client Secret atualizado!"
echo ""
echo "🔍 Verificando configuração final:"
echo ""
grep "YOUTUBE_" backend/.env
echo ""
echo "✅ Tudo configurado! Agora você tem:"
echo "- Sign-in Google usando Client 'Sing in Google'"
echo "- YouTube OAuth usando Client 'Sistema Lancei Essa Youtube'" 