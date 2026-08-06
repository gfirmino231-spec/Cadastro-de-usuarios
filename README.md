# Cadastro de Usuários

Aplicação full stack de CRUD de usuários: API REST em **NestJS + Prisma + PostgreSQL** e interface em **React + Vite + TypeScript**.

## Estrutura

```
back/backend/   API NestJS (Prisma + PostgreSQL)
front/          SPA React + Vite
```

## Stack

| Camada | Tecnologias |
| --- | --- |
| Backend | NestJS 11, Prisma 7, PostgreSQL, class-validator, class-transformer |
| Frontend | React 19, Vite, TypeScript, Axios, react-icons |

## Modelo de dados

`back/backend/prisma/schema.prisma`:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  nome      String
  idade     Int
  createdAt DateTime @default(now())
}
```

## Endpoints

Base: `http://localhost:3000`

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/usuarios` | Cria um usuário |
| `GET` | `/usuarios` | Lista todos os usuários |
| `PUT` | `/usuarios/:id` | Atualiza um usuário |
| `DELETE` | `/usuarios/:id` | Remove um usuário |

Corpo do `POST /usuarios`:

```json
{ "nome": "Gustavo", "email": "gustavo@exemplo.com", "idade": 22 }
```

## Validação

Um `ValidationPipe` global roda com `transform`, `whitelist` e `forbidNonWhitelisted` — campos que não existem no DTO fazem a requisição ser rejeitada. Regras do `CriarUsuarioDto`:

- **nome** — não pode ser vazio
- **email** — formato válido e **único**, checado por um decorator assíncrono (`@emailEhUnico`) que consulta o banco através do `UsuarioService`
- **idade** — inteiro entre 18 e 120

## Como rodar

Pré-requisitos: Node.js, npm e um PostgreSQL acessível.

### Backend

```bash
cd back/backend
npm install
```

Crie um `.env` com a string de conexão:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/cadastro"
```

Aplique as migrações e suba a API:

```bash
npx prisma migrate deploy
npm run start:dev
```

A API sobe em `http://localhost:3000` (ou na porta definida em `PORT`).

### Frontend

```bash
cd front
npm install
npm run dev
```

A interface sobe em `http://localhost:5173` — que é exatamente a origem liberada no CORS da API, então suba o backend primeiro. A URL base do Axios está fixada em `front/src/api/api.ts`.

## Scripts úteis

No backend: `npm run start:dev` (watch), `npm run build`, `npm run lint`, `npm run test`, `npm run test:e2e`.
No frontend: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.

## Branches

`dev` (padrão) · `homolog` · `main`
