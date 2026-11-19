# FlaRádio Oficial — Portal + Painel Administrativo

Portal web com identidade rubro-negra, rádio online, placar editável com animação de gol, banners, notícias, programação, equipe e links sociais.

## Executar localmente
1. Instale Node.js 18 ou mais recente.
2. Abra um terminal na pasta `flaradio-site`.
3. Execute `npm install`.
4. Defina uma senha forte de administrador e segredo de sessão antes de iniciar:
   - Windows PowerShell: `$env:ADMIN_USER="admin"; $env:ADMIN_PASSWORD="SuaSenhaForteAqui"; $env:SESSION_SECRET="um-segredo-longo-e-aleatorio"; npm start`
   - Linux/macOS: `ADMIN_USER=admin ADMIN_PASSWORD='SuaSenhaForteAqui' SESSION_SECRET='segredo-longo' npm start`
5. Acesse `http://localhost:3000` para o site e `http://localhost:3000/admin` para administrar.

## Funções no painel
- Player/rádio: URL de stream compatível com HTML Audio (MP3/AAC/stream direto), nome e status.
- Placar: competição, status, clubes, iniciais ou URL de escudo, gols, relógio e estádio. Botões de gol disparam animação e incrementam o placar em tela no painel; salve para publicar.
- Banners: imagem por URL, textos e CTA; slide adicional com ativação e rotação.
- Notícias, programação e equipe: cadastro, edição e exclusão.
- Redes sociais e ticker.

## Hospedagem
O projeto usa Node.js + Express e precisa de hospedagem que execute aplicações Node.js. O domínio deve apontar para o serviço de hospedagem, que fornecerá os nameservers (DNS 1 e DNS 2) ou registros DNS próprios. DNS não está embutido no ZIP; os valores são fornecidos pela hospedagem depois do deploy.

## Segurança antes de publicar
- Nunca publique usando a senha padrão. Configure `ADMIN_PASSWORD` e `SESSION_SECRET` no ambiente de hospedagem.
- Ative HTTPS na hospedagem.
- O painel usa sessão de login, mas recomenda-se reforçar segurança, backup e proteção contra tentativas de login antes de uma operação pública de alto tráfego.

