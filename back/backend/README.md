# Cadastro de Usuários — Backend

API REST construída com **NestJS**, **Prisma ORM 7** e **PostgreSQL** (hospedado no **Supabase**), responsável pelo cadastro, listagem, atualização e remoção de usuários.

Este projeto tem foco no backend — o front-end (em `../../front`) é apenas uma interface simples em React para consumir esta API.

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | [NestJS 11](https://nestjs.com) |
| ORM | [Prisma 7](https://www.prisma.io) (com `@prisma/adapter-pg`) |
| Banco de dados | PostgreSQL via [Supabase](https://supabase.com) |
| Validação | `class-validator` / `class-transformer` |
| Linguagem | TypeScript |

## Estrutura do projeto

```
src/
├── main.ts                        # bootstrap da aplicação (CORS, ValidationPipe)
├── app.module.ts                  # módulo raiz
├── prisma/
│   ├── prisma.module.ts           # módulo global do Prisma
│   └── prisma.service.ts          # PrismaClient injetável (driver adapter pg)
├── generated/prisma/               # client do Prisma gerado (não versionado)
└── usuario/
    ├── usuario.module.ts
    ├── usuario.controller.ts      # rotas HTTP de /usuarios
    ├── usuario.service.ts         # regras de negócio + acesso ao banco
    ├── usuarioEntity.ts
    └── dto/
        ├── criar-usuario.dto.ts       # validação do POST
        ├── AtualizaUsuarioDTO.ts      # validação do PUT
        ├── ListaUsuarioDTO.ts         # formato de retorno (id, nome, email, idade)
        └── validacao/
            └── verificar-email.ts     # validador assíncrono de e-mail único (usado no cadastro)

prisma/
├── schema.prisma                  # modelo de dados (model User)
└── migrations/                    # histórico de migrations SQL
```

## Modelo de dados

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

Base path: `/usuarios`

| Método | Rota | Body | Descrição |
|---|---|---|---|
| `POST` | `/usuarios` | `{ nome, email, idade }` | Cria um usuário. Valida nome obrigatório, e-mail válido e único, idade inteira entre 18 e 120 |
| `GET` | `/usuarios` | — | Lista todos os usuários (`id`, `nome`, `email`, `idade`) |
| `PUT` | `/usuarios/:id` | `{ nome, email, idade }` | Atualiza um usuário existente. O e-mail pode permanecer o mesmo do próprio usuário (a checagem de duplicidade ignora o registro que está sendo editado) |
| `DELETE` | `/usuarios/:id` | — | Remove um usuário |

Todas as rotas retornam `404` (`NotFoundException`) se o `id` não existir, e `400` (`BadRequestException`) em caso de dados inválidos ou e-mail duplicado.

### Exemplo de resposta — `POST /usuarios`

```json
{
  "usuario": { "id": 1, "nome": "Ana", "email": "ana@email.com", "idade": 25 },
  "message": "usuario criado com sucesso"
}
```

## Configuração do ambiente

Crie um `.env` na raiz deste backend (`back/backend/.env`) com a connection string do Postgres do Supabase:

```env
DATABASE_URL="postgresql://<usuario>:<senha>@<host>.pooler.supabase.com:5432/postgres"
```

> Usamos a porta **5432** (conexão direta), não o pooler em modo *transaction* (6543), pois o NestJS mantém um servidor de longa duração com seu próprio pool de conexões — não precisa do pgbouncer.
>
> Se a senha tiver caracteres especiais (`@`, `#`, etc.), faça o *URL encode* antes de colar na string (ex: `@` → `%40`).

## Rodando o projeto

```bash
# instalar dependências
npm install

# gerar o Prisma Client a partir do schema
npx prisma generate

# aplicar as migrations no banco (cria as tabelas)
npx prisma migrate dev

# subir em modo desenvolvimento (watch)
npm run start:dev

# build de produção
npm run build
npm run start:prod
```

A API sobe por padrão em `http://localhost:3000`. O CORS já está liberado para `http://localhost:5173` (porta padrão do Vite, usada pelo front).

## Sobre a integração com Prisma 7 + Supabase

Esse projeto usa a versão mais recente do Prisma (7), que mudou bastante em relação às versões anteriores — vale documentar as decisões tomadas aqui:

- **Driver Adapter obrigatório**: a partir do Prisma 7, `PrismaClient` não aceita mais só uma connection string — é preciso passar um *driver adapter*. Para Postgres usamos `@prisma/adapter-pg` (`PrismaPg`), instanciado em [`prisma.service.ts`](src/prisma/prisma.service.ts) com a `DATABASE_URL`.
- **`moduleFormat = "cjs"` no `schema.prisma`**: por padrão, o gerador do Prisma client tenta inferir o formato do módulo (ESM/CJS) a partir do `tsconfig.json`. Como este projeto usa `"module": "nodenext"` mas roda em CommonJS (sem `"type": "module"` no `package.json`), é necessário forçar `moduleFormat = "cjs"` no generator — caso contrário o client gerado usa `import.meta.url`, que quebra em runtime CJS.
- **`prisma.config.ts`**: substitui o antigo bloco `url = env("DATABASE_URL")` dentro do `datasource` do `schema.prisma`. Esse arquivo é usado **apenas pela CLI do Prisma** (`generate`, `migrate`, `studio`) — por isso o `main.ts` carrega o `.env` manualmente com `import 'dotenv/config'` antes de iniciar o Nest, garantindo que a aplicação em si também tenha acesso à `DATABASE_URL`.
- **`directUrl` foi removido**: versões antigas usavam uma URL separada (porta 5432) para migrations quando a aplicação rodava via pooler (porta 6543). No Prisma 7 isso não existe mais — por isso optamos por usar a conexão direta (5432) tanto para a aplicação quanto para as migrations.

## Validações de negócio

- **Nome**: obrigatório (`@IsNotEmpty`)
- **E-mail**: precisa ser um e-mail válido (`@IsEmail`) e único na base. No cadastro, a unicidade é validada via decorator customizado (`@emailEhUnico`, em `dto/validacao/verificar-email.ts`). Na atualização, essa checagem é feita no `usuario.service.ts` (método `atualizar`), excluindo o próprio registro da comparação — assim, editar um usuário sem mudar o e-mail não é bloqueado por engano.
- **Idade**: precisa ser um número inteiro entre 18 e 120 (`@IsInt`, `@Min(18)`, `@Max(120)`)

## Testes

```bash
npm run test       # testes unitários
npm run test:e2e   # testes end-to-end
npm run test:cov   # cobertura
```
