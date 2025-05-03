# Fastify Clean Architecture API

## Introdução

Uma API autodocumentável construída com Fastify, utilizando arquitetura limpa, SOLID e DDD. Gerencia autenticação de usuários com foco em simplicidade e boas práticas.

## Tecnologias

- Linguagem: [Node.js](https://nodejs.org)
- Framework: [Fastify.js](https://www.fastify.io)
- ORM: [PrismaORM](https://www.prisma.io)
- Documentação [Swagger](https://swagger.io/)
- Banco de Dados: [PostgreSQL](https://www.postgresql.org)
- Autenticação: [JWT](https://jwt.io)
- Gerenciamento de Dependências: [pnpm](https://pnpm.io)
- Linter: [ESLint](https://eslint.org)
- Testes: [Vitest](https://vitest.dev)

## Estrutura do Projeto

# Estrutura do Projeto

| Diretório/Arquivo                                                       | Descrição                                                                                           |
| ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **prisma/**                                                             | Configuração do Prisma ORM para gerenciamento do banco de dados                                     |
| └─ **migrations/**                                                      | Pasta com as migrações do Prisma                                                                    |
| └─ **schema.prisma**                                                    | Arquivo de configuração de schema                                                                   |
| **src/**                                                                | Código-fonte principal da aplicação                                                                 |
| └─ **core/**                                                            | Componentes centrais e reutilizáveis                                                                |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **entities/**                                | Definições de entidades "core" que serão usadas no domínio                                          |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **errors/**                                  | Gerenciamento de erros personalizados                                                               |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **types/**                                   | Definições de tipos TypeScript                                                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **utils/**                                   | Funções utilitárias e helpers                                                                       |
| └─ **domain/**                                                          | Lógica de negócio e regras do domínio                                                               |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **cryptography/**                            | Abstrações das classes que envolvem criptografia                                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **entities/**                                | Entidades específicas do domínio                                                                    |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **value-objects/**   | Estruturas imutáveis que compõe entidades de negócio                                                |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **repositories/**                            | Interfaces de repositórios para acesso a dados                                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **use-cases/**                               | Casos de uso que implementam a lógica de negócio                                                    |
| └─ **infra/**                                                           | Camada de infraestrutura e integrações externas                                                     |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **adapters/**                                | Adaptadores para conectar domínio e infraestrutura                                                  |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **database/prisma/**                         | Implementações específicas do Prisma                                                                |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **mappers/**         | Mapeamento entre modelos de dados e entidades                                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **repositories/**    | Implementações concretas de repositórios                                                            |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **use-cases/**       | Casos de uso adaptados para infraestrutura                                                          |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **prisma.ts**        | Configuração e inicialização do Prisma Client                                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **env/**                                     | Configurações de variáveis de ambiente                                                              |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **http/**                                    | Configurações relacionadas à API HTTP                                                               |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **controllers/**     | Controladores para lidar com requisições HTTP                                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **middlewares/**     | Middlewares para processamento de requisições                                                       |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **schemas/**         | Esquemas de validação de dados                                                                      |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **error-handler.ts** | Manipulação centralizada de erros HTTP                                                              |
| &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└─ **server.ts**        | Inicialização e configuração do servidor Fastify                                                    |
| **test/**                                                               | Pasta que gerencia os arquivos necessários para a execução dos testes                               |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **cryptography/**                            | Classes que simulam as funcionalidades de criar token e criptografar e comparar senhas criptografas |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **factories/**                               | Funções que criam "mocks" das entidades para serem utilizadas nos testes                            |
| &nbsp;&nbsp;&nbsp;&nbsp;└─ **repositories/**                            | Repositórios em memória para serem utilizados nos testes                                            |

## Endpoints

| Método   | Endpoint         | Descrição                                   |
| -------- | ---------------- | ------------------------------------------- |
| **POST** | `/auth/sign-up`  | Registrar um novo usuário                   |
| **POST** | `/auth/sign-in`  | Fazer login e obter o token de autenticação |
| **GET**  | `/users/profile` | Obter o perfil do usuário autenticado       |

## Instalação

Crie uma fork do repositório:

Acesse: https://github.com/izaiasmorais/fastify-clean-architecture/fork

Clone o repositório na sua máquina:

```bash
git clone https://github.com/[seu usuário]/fastify-clean-architecture
```

Acesse o projeto:

```bash
cd fastify-clean-architecture
```

Instale as dependências:

```bash
pnpm install
```

Configure o arquivo .env com suas credenciais (baseado no .env.example):

```env
NODE_ENV=development
EXPIRES_IN=10000
PORT=3333
DATABASE_URL=postgresql://postgres:docker@localhost:5432/fastify
```

# Executando o Projeto

Rode o banco postgres no docker (caso não já possua um postgres em outro serviço):

```bash
docker compose up -d
```

Suba as migrações para o banco:

```bash
pnpm migrate
```

Gere o schema do prisma:

```bash
pnpm generate
```

Inicie o servidor:

```bash
pnpm dev
```

# Executando os Testes

Testes unitários:

```bash
pnpm test
```

Testes E2E:

```bash
pnpm test:e2e
```
