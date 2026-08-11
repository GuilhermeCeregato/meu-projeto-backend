# meu-projeto-backend

Rode estes comandos para preparar o ambiete.
npm init -y
npm i -D typescript @types/node tsx
npx tsc --init
Rode estes comandos para preparar o framework Express:
npm install express
npm install -D @types/express
crie uma pasta e o arquivo .ts: src/app.ts

A estrutura ficará assim:
meu-projeto-backend
│
├── node_modules
├── src
│   └── app.ts
├── package.json
└── tsconfig.json
Criar o servidor com Express
No arquivo app.ts, adicione o seguinte código:
// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express } from "express";

// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
Configurar o script de execução
Abra o arquivo package.json e altere a seção "scripts" para:
"scripts": {
  "dev": "tsx watch src/app.ts"
},
Executar o servidor
No terminal, execute:
npm run dev
Se tudo estiver correto, o terminal exibirá:
Servidor rodando em http://localhost:8081