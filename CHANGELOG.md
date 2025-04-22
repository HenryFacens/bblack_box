# 📦 Changelog - Black Box Backend

Todas as mudanças importantes neste projeto serão documentadas neste arquivo.

O formato segue as convenções de [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/), e este projeto segue o versionamento [SemVer](https://semver.org/lang/pt-BR/).

---

## [1.0.1] - 2025-04-17
### Adicionado
- Inicialização da estrutura base do projeto com Express, PostgreSQL e Sequelize
- Integração com Swagger para documentação automática da API (`/api-docs`)
- Autenticação via JWT com rotas públicas e protegidas (`/api/auth/login`, etc.)
- Dump SQL com estrutura e dados básicos (`import_db_dump/dump-black_box-20250417.sql`)
- Upload de imagens salvas na pasta `/uploads`
- Middleware global de autenticação e tratamento de erros
- Modularização por domínio (`auth`, `user`, etc.)
- Exibição automática de IPs disponíveis na rede local para facilitar testes com Expo (no `server.js`)

### Alterado
- Refatoração do `server.js` para detectar IPs locais dinamicamente usando `os.networkInterfaces()`
- README.md reformulado com instruções completas de uso, instalação, restore de banco e integração mobile

### Corrigido
- Caminhos absolutos de imagem que usavam `localhost`, agora adaptados para IP dinâmico no mobile

---

## [0.1.0] - 2025-04-10
### Adicionado
- Estrutura inicial com express-generator
- Configuração básica de conexão com PostgreSQL via Sequelize CLI
- Rotas de teste para API base

---

