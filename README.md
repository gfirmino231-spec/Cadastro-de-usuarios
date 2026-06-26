# Cadastro de Usuários

Projeto full-stack de cadastro de usuários, com foco principal no **backend**: uma API REST em **NestJS** com **Prisma ORM 7** conectada a um banco **PostgreSQL hospedado no Supabase**. O front-end em React serve apenas como interface para consumir essa API.

## Estrutura do repositório

```
.
├── back/backend/   # API REST (NestJS + Prisma + PostgreSQL/Supabase)
└── front/          # Interface web (React + Vite + TypeScript)
```

## Backend — NestJS + Prisma + Supabase

Toda a documentação detalhada do backend (modelo de dados, endpoints, variáveis de ambiente, decisões de configuração do Prisma 7, validações de negócio, como rodar e testar) está em:

**[`back/backend/README.md`](back/backend/README.md)**

Resumo rápido:

```bash
cd back/backend
npm install
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

A API sobe em `http://localhost:3000`, com rotas CRUD em `/usuarios`.

## Frontend — React + Vite

Interface simples para cadastrar, listar, editar e remover usuários, consumindo a API do backend.

```bash
cd front
npm install
npm run dev
```

O front sobe em `http://localhost:5173` e já está configurado (CORS) para conversar com o backend em `http://localhost:3000`.

## Stack geral

| Camada | Tecnologia |
|---|---|
| Backend | NestJS 11, Prisma ORM 7, PostgreSQL (Supabase), class-validator |
| Frontend | React 19, Vite, TypeScript, Axios |
