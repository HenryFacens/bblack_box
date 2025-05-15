# Black Box Backend

Sistema de gerenciamento de reportes e ocorrências, desenvolvido com Node.js, Express e PostgreSQL, seguindo princípios SOLID e boas práticas de arquitetura.

## 🚀 Características

- Autenticação JWT
- Documentação Swagger
- Arquitetura modular
- Tratamento centralizado de erros
- Upload de imagens
- Sistema de notificações
- Interações (likes/dislikes)
- Comentários
- Avaliações
- Moderação de conteúdo via IA

## 📁 Estrutura do Projeto

```bash
black_box/
├── config/
│   └── config.json          # Configurações Sequelize
├── migrations/              # Migrações do banco
├── seeders/                 # Seeds iniciais
├── src/
│   ├── app.js              # Config Express
│   ├── server.js           # Inicialização
│   ├── config/
│   │   ├── db.js           # Conexão PostgreSQL
│   │   ├── env.js          # Variáveis ambiente
│   │   └── swagger.js      # Config Swagger
│   ├── middleware/
│   │   ├── auth.js         # Autenticação JWT
│   │   └── upload.js       # Upload imagens
│   ├── models/             # Modelos Sequelize
│   ├── modules/            # Módulos do sistema
│   │   ├── auth/
│   │   ├── user/
│   │   ├── reporte/
│   │   ├── notification/
│   │   ├── category/
│   │   └── status/
│   └── shared/
        └── error-handler.js # Tratamento de erros
```

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/black-box.git
cd black-box
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env`:
```env
PORT=3000
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=black_box
JWT_SECRET=seu_jwt_secret
```

4. Crie o banco de dados:
```sql
CREATE DATABASE black_box;
```

5. Execute as migrações:
```bash
npx sequelize-cli db:migrate
```

6. Execute os seeds:
```bash
npx sequelize-cli db:seed:all
```

## 🚦 Uso

1. Inicie o servidor:
```bash
npm start
```

2. Acesse a documentação Swagger:
```
http://localhost:3000/api-docs
```

## 🏗️ Implementação de Padrões SOLID

### 1. Single Responsibility Principle (SRP)
Cada classe tem uma única responsabilidade:
- **Controllers**: Gerenciam requisições HTTP
- **Services**: Contêm lógica de negócio
- **Models**: Representam entidades do banco

### 2. Open/Closed Principle (OCP)
- Módulos extensíveis sem modificação
- Novas funcionalidades via herança/composição

### 3. Liskov Substitution Principle (LSP)
- Controllers e services substituíveis sem quebrar o sistema

### 4. Interface Segregation Principle (ISP)
- Interfaces específicas para cada funcionalidade

### 5. Dependency Inversion Principle (DIP)
- Injeção de dependências via construtores
- Desacoplamento entre módulos

### Outras Boas Práticas

- **Modularização**: Cada domínio (ex: user, auth, reporte) possui sua própria pasta com controller, service e rotas.
- **Tratamento Centralizado de Erros**: Um `ErrorHandler` centraliza o tratamento e resposta de erros.
- **Validação e Autorização**: Middlewares garantem autenticação JWT e autorização por perfil.
- **Documentação**: Todas as rotas são documentadas via Swagger.
- **Padrão DTO**: Apenas os campos necessários são expostos nas respostas.
- **Separação de camadas**: Controllers não acessam diretamente o banco, apenas via services.

### Exemplo de Estrutura SOLID

```
src/
  modules/
    user/
      user.controller.js   // Orquestra requisições HTTP
      user.service.js      // Lógica de negócio do usuário
      user.routes.js       // Define endpoints e middlewares
    reporte/
      reporte.controller.js
      reporte.service.js
      reporte.routes.js
  shared/
    error-handler.js       // Tratamento centralizado de erros
  middleware/
    auth.js               // Autenticação JWT
    errorHandler.js       // Middleware global de erros
```

### Exemplo de Injeção de Dependência

```js
// user.controller.js
class UserController {
  constructor(userService, errorHandler) {
    this.userService = userService;
    this.errorHandler = errorHandler;
  }
  // ...
}
```
```js
// index.js do módulo
const UserController = require('./user.controller');
const UserService = require('./user.service');
const ErrorHandler = require('../../shared/error-handler');
const userController = new UserController(new UserService(), new ErrorHandler());
module.exports = userController;
```

---

## 📦 Módulos Principais

### Auth
- Login
- Registro
- Recuperação de senha
- Refresh token

### User
- CRUD de usuários
- Perfil
- Permissões

### Reporte
- Criação de reportes
- Upload de imagens
- Categorização
- Status
- Avaliações
- Interações
- Comentários

### Notification
- Notificações em tempo real
- Histórico
- Preferências

## 🔐 Autenticação

Use o endpoint `/api/auth/login`:
```json
{
  "email": "admin@blackbox.com",
  "password": "admin123"
}
```

## 🧪 Testes

Execute os testes:
```bash
npm test
```

## 📝 Documentação

A documentação completa está disponível via Swagger em `/api-docs`.

## 🛣️ Principais Rotas

### Auth
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

### User
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `DELETE /api/users/profile`

### Reporte
- `POST /api/reportes`
- `GET /api/reportes`
- `GET /api/reportes/my`
- `POST /api/reportes/:id/avaliar`
- `POST /api/reportes/:id/interagir`
- `POST /api/reportes/:id/comentar`

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Autores

- **Eduardo Weber Maldaner** - *Trabalho inicial* - [@L0G1C06](https://github.com/L0G1C06)
- **Henry Santurião Almeida** - *Trabalho inicial* - [@HenryFacens](https://github.com/HenryFacens)
- **Eduardo Prestes** - *Trabalho inicial* - [@DJmesh](https://github.com/DJmesh)

## 🙏 Agradecimentos

- Time de desenvolvimento

---

**Nota**: Substitua os placeholders (seu-usuario, seu_jwt_secret, etc.) com suas informações reais antes de publicar.