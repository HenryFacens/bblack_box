# Black Box Backend

Este projeto é uma estrutura base para uma API RESTful utilizando **Node.js**, **Express**, **PostgreSQL**, **JWT** e **Swagger**, com organização modular, suporte a autenticação e padrões de segurança.

---

## 📁 Estrutura do Projeto

```bash
bblack_box/
├── config/                      # Configuração do Sequelize CLI
├── import_db_dump/             # Dump SQL do banco de dados (necessário rodar após clonar)
│   └── dump-black_box-YYYYMMDD.sql
├── migrations/                 # Migrations do Sequelize
├── node_modules/
├── src/
│   ├── app.js                  # Configuração da aplicação Express
│   ├── server.js               # Inicialização do servidor + detecção automática do IP local
│   ├── config/
│   │   ├── db.js               # Conexão com PostgreSQL via Sequelize
│   │   ├── env.js              # Carrega variáveis de ambiente
│   │   └── swagger.js          # Configuração do Swagger
│   ├── middleware/             # Middlewares de autenticação, erro, etc.
│   ├── models/                 # Models Sequelize
│   ├── modules/                # Módulos por domínio (auth, user, etc.)
│   └── services/               # Camadas de serviços e regras de negócio
├── static/                     # Arquivos estáticos (caso necessário)
├── uploads/                    # Diretório onde as imagens são salvas
├── .env                        # Variáveis de ambiente (PORT, PG_URI, JWT_SECRET, etc.)
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Inicialização e Configuração

### 1. Clone o projeto e instale as dependências:
```bash
npm install
```

### 2. Configure o arquivo `.env`:
```env
PORT=3000
PG_URI=postgres://admin:admin@localhost:5432/black_box
JWT_SECRET=sua_chave_secreta_segura
```

### 3. Restaure o banco de dados utilizando o dump:
```bash
psql -U seu_usuario -d black_box -f import_db_dump/dump-black_box-20250417.sql
```

> 💡 O arquivo de dump contém a estrutura e dados iniciais. Importante para o funcionamento da API.

### 4. Inicie o servidor:
```bash
npm start
```

---

## 🌐 Acesso via rede local (Expo)

O `server.js` imprime automaticamente os IPs da máquina local. Exemplo:

```bash
 Servidor rodando com sucesso!
 Local:  http://localhost:3000
 Endereços disponíveis na rede local:
  - Wi-Fi: http://192.168.0.104:3000
  - Ethernet: http://172.16.52.84:3000

 Use o IP correspondente à sua rede Wi-Fi ou Ethernet no .env do app mobile.
```
**Essencial o uso do Ethernet no API_URL no repositório do projeto do app mobile para o bom funcionamento do expo**

---

## 🧪 Testes e Uso da API

- Acesse a documentação da API via Swagger:
```bash
http://localhost:3000/api-docs
```

- Endpoint de login:
```http
POST /api/auth/login
```
Body:
```json
{
  "email": "admin@blackbox.com",
  "senha": "admin"
}
```

---

## 🔐 Observações de Segurança

- Certifique-se de **não versionar o `.env`** com credenciais sensíveis.
- A chave JWT deve ser forte e mantida em segredo.
- O diretório `uploads/` pode conter imagens de usuários — proteja-o adequadamente se subir para produção.
-  Certifique-se de que o PostgreSQL esteja rodando e que o arquivo .env aponte para as credenciais corretas (PG_URI).

---

## 📝 Licença

Este projeto está licenciado sob os termos da **MIT License**.

