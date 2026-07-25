# Freelance Dashboards Backend

> 🚀 **Projeto de Portfólio** - API REST para gestão de projetos freelance, clientes e finanças.

Este projeto é uma demonstração de habilidades em desenvolvimento backend com TypeScript, Express, Prisma e PostgreSQL.

## 📋 Índice

- [Tecnologias](#tecnologias)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Boas Práticas Implementadas](#boas-práticas-implementadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Melhorias Futuras](#melhorias-futuras)

## 🛠 Tecnologias

- **TypeScript** - Tipagem estática
- **Express.js** - Framework web
- **Prisma ORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **CORS** - Habilita requisições cross-origin
- **Dotenv** - Gerenciamento de variáveis de ambiente

## ✨ Funcionalidades

- **Gestão de Projetos**: CRUD completo para projetos freelance
- **Gestão de Clientes**: Controle de clientes e seus dados
- **Controle Financeiro**: Transações, receitas e resumo financeiro
- **Relacionamentos**: Projetos vinculados a transações

## 📦 Instalação

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/lucasumberto/freelance-dashboards-backend.git
cd freelance-dashboards-backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações do PostgreSQL.

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

5. Inicie o servidor em desenvolvimento:
```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

## 🎯 Boas Práticas Implementadas

### Arquitetura
- **Separação de responsabilidades**: Controllers, Routes e Types em diretórios separados
- **Configuração centralizada**: Cliente Prisma em arquivo dedicado
- **Typescript estrito**: Interfaces para DTOs e tipos de domínio

### Código
- **Type Safety**: Uso de TypeScript em todo o projeto
- **Interfaces DTOs**: Separação clara entre dados de entrada e modelos
- **Padrão RESTful**: Convenções REST para endpoints
- **Código limpo**: Funções pequenas e focadas

### Banco de Dados
- **ORM Prisma**: Type-safe database access
- **Migrations**: Controle de versão do schema
- **Relacionamentos**: Estrutura relacional bem definida

### Desenvolvimento
- **Hot reload**: Nodemon para desenvolvimento ágil
- **TypeScript compilation**: tsx para execução direta
- **Environment variables**: Separação de configurações por ambiente

## 📁 Estrutura do Projeto

```
src/
├── app.ts              # Configuração do Express
├── server.ts           # Entry point do servidor
├── config/
│   └── prisma.ts       # Cliente Prisma
├── controllers/        # Lógica de negócio
│   ├── clientController.ts
│   ├── financeController.ts
│   └── projectController.ts
├── routes/            # Definição de rotas
│   ├── clientRoutes.ts
│   ├── financeRoutes.ts
│   └── projectRoutes.ts
└── types/             # Interfaces TypeScript
    ├── client.ts
    ├── finance.ts
    └── project.ts
```

## 🔌 API Endpoints

### Projetos (`/projects`)
- `GET /projects` - Listar todos os projetos
- `GET /projects/:id` - Buscar projeto por ID
- `POST /projects` - Criar novo projeto
- `PUT /projects/:id` - Atualizar projeto
- `DELETE /projects/:id` - Deletar projeto

### Clientes (`/clients`)
- `GET /clients` - Listar todos os clientes
- `GET /clients/:id` - Buscar cliente por ID
- `POST /clients` - Criar novo cliente
- `PUT /clients/:id` - Atualizar cliente
- `DELETE /clients/:id` - Deletar cliente

### Finanças (`/finances`)
- `GET /finances/summary` - Resumo financeiro
- `GET /finances/transactions` - Listar transações
- `GET /finances/revenue` - Receitas mensais

## 🚧 Melhorias Futuras

Este é um projeto de portfólio em constante evolução. Próximas melhorias planejadas:

- [ ] Validação de dados com Zod
- [ ] Autenticação e autorização (JWT)
- [ ] Rate limiting
- [ ] Middleware de erro global
- [ ] Logging estruturado
- [ ] Testes unitários e integração
- [ ] Documentação da API com Swagger
- [ ] Paginação nas queries
- [ ] Cache com Redis
- [ ] Correção de tipos de data no schema (String → DateTime)
- [ ] Implementação de enums no Prisma
- [ ] Relação entre Project e Client

---

**Desenvolvido como projeto de portfólio para demonstração de habilidades em desenvolvimento backend.**
