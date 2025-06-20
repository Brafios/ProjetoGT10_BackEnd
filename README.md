# 📦 Projeto GT10 - Backend

## 🔎 Visão Geral

API REST desenvolvida em **Node.js** com **Express**, conectada ao banco Supabase. Serve como back-end para o site da **Federação do Comércio**, com funcionalidades de autenticação, listagem e gerenciamento de **associações comerciais** e **notícias**.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Supabase**
- **dotenv**
- **CORS**
- **Axios**
- **Nodemon**

---

## 📁 Estrutura de Pastas

```
ProjetoGT10_BackEnd/
├── config/               # Configurações do Supabase
├── controllers/          # Lógica dos endpoints (CRUD)
├── middleware/           # Autenticação JWT
├── models/               # Acesso ao banco de dados (Supabase)
├── routes/               # Definição de rotas
├── utils/                # Funções auxiliares
├── .env                  # Variáveis de ambiente
├── app.js                # Configuração principal do Express
├── server.js             # Inicialização do servidor
└── vercel.json           # Configuração para deploy
```

---

## 🔐 Autenticação

Middleware: `authMiddleware.js`  
- Verifica se o token JWT está presente no `Authorization Bearer`
- Bloqueia acesso não autorizado às rotas protegidas (`POST`, `PUT`, `DELETE` de associações e notícias)

---

## 📌 Endpoints

### 📂 Autenticação (`/auth`)
| Método | Rota           | Descrição              |
|--------|----------------|------------------------|
| POST   | `/auth/login`  | Autentica e retorna JWT |
| POST   | `/auth/register` | Cria novo usuário      |

---

### 🏛️ Associações (`/associacoes`)

| Método | Rota                  | Descrição                     | Protegido |
|--------|-----------------------|-------------------------------|-----------|
| GET    | `/`                   | Lista todas as associações    | ❌        |
| GET    | `/:id`                | Busca uma associação por ID   | ❌        |
| POST   | `/`                   | Cria nova associação          | ✅        |
| PUT    | `/:id`                | Atualiza dados da associação  | ✅        |
| DELETE | `/:id`                | Deleta uma associação         | ✅        |

---

### 📰 Notícias (`/noticias`)

Funciona de forma idêntica à rota de associações. A estrutura dos controllers, models e rotas segue o mesmo padrão RESTful.

---

## 🧠 Lógica dos Controllers

Os `Controllers` implementam validações básicas, tratamento de erros com mensagens customizadas e utilizam os métodos dos `Models` (que usam Supabase).

Exemplo de resposta:
```json
{
  "message": "Associação criada com sucesso",
  "data": {
    "id": 7,
    "nome": "ACISA",
    "cnpj": "12.345.678/0001-90"
  }
}
```

---

## 🗂️ Supabase

O arquivo `config/supabase.js` centraliza a conexão com o Supabase. Os models utilizam métodos como:

- `.select()` para buscar dados
- `.insert()` para criar registros
- `.update()` para atualizar
- `.delete()` para excluir

---

## ⚙️ Execução Local

1. Clone o projeto:
```bash
git clone https://github.com/seu-usuario/ProjetoGT10_BackEnd.git
```

2. Instale as dependências:
```bash
npm install
```

3. Crie o arquivo `.env`:
```env
SUPABASE_URL=https://sua-instancia.supabase.co
SUPABASE_KEY=chave_api_publica
```

4. Inicie o servidor:
```bash
npm run dev
```

Servidor disponível em: `http://localhost:3000`

---

## 🌐 Deploy

O projeto está preparado para deploy na Vercel. Veja o arquivo `vercel.json`.

---

## ✅ Próximos passos (Sugestão)

- Testes unitários com Jest
- Padronização com ESLint + Prettier
- Validações com Joi ou Zod
- Swagger para documentação automática da API