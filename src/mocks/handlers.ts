// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

const tarefas = [
  {
    id: 1,
    nome: "Estudar React: ",
    concluida: false,
  },
  {
    id: 2,
    nome: "Estudar Typescript: ",
    concluida: false,
  },
];

export const handlers = [
  http.get("/tarefas", () => {
    return HttpResponse.json(tarefas, { status: 200 });
  }),
];
