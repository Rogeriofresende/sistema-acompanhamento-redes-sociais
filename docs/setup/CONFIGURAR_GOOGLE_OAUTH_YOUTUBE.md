# Configurar OAuth2 do YouTube no Google Console

## Problema
Erro "redirect_uri_mismatch" ao tentar conectar o YouTube.

## Solução

1. Acesse: https://console.cloud.google.com

2. Selecione seu projeto

3. Vá para "APIs e serviços" → "Credenciais"

4. Encontre a credencial OAuth2:
   - Client ID: `603127623499-n8tguni1369tqv6lota40lrktdic7n9p`

5. Clique para editar

6. Em "URIs de redirecionamento autorizadas", adicione:
   ```
   http://localhost:4000/api/youtube/callback
   ```

7. Salve as alterações

8. Aguarde alguns segundos para propagar

## Teste
Após configurar, volte ao Dashboard e clique em "Conectar Canal do YouTube" novamente. 