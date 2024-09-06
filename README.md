# Projeto de Estudos: React com Next.js, Prisma, Vite e TypeScript

Este projeto é um estudo sobre a construção de uma aplicação utilizando React com Next.js, Prisma, Vite e TypeScript. A aplicação inclui rotas para login e dashboard.

## Funcionalidades

- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **Next.js**: Framework React para renderização do lado do servidor e geração de sites estáticos.
- **Prisma**: ORM (Object-Relational Mapping) para Node.js e TypeScript.
- **Vite**: Ferramenta de build rápida e leve.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.

## Rotas

- `/login`: Rota para a página de login.
- `/dashboard`: Rota para a página de dashboard.

## Começando

### Pré-requisitos

- Node.js
- Yarn ou npm

### Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seuusuario/seu-repo.git
    cd seu-repo
    ```

2. Instale as dependências:
    ```bash
    yarn install
    # ou
    npm install
    ```

3. Configure o Prisma:
    ```bash
    npx prisma init
    ```

4. Configure a string de conexão no arquivo `.env`:
    ```env
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
    ```

5. Execute as migrações do Prisma:
    ```bash
    npx prisma migrate dev
    ```

6. Inicie o servidor de desenvolvimento:
    ```bash
    yarn dev
    # ou
    npm run dev
    ```

## Uso

Acesse as rotas `/login` e `/dashboard` para testar a aplicação.

## Contribuindo

Contribuições são bem-vindas! Por favor, faça um fork do repositório e envie um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.
