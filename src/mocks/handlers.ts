// src/mocks/handlers.js
import { http, HttpResponse } from "msw";

type Tarefa = {
  id: number,
  nome: string,
  concluida: boolean
}

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
  }
]

export const handlers = [
  http.get("/tarefas", () => {
    return HttpResponse.json(tarefas);
  }),
  http.post<{ nome: string}>("/tarefas", async ({ request }) => {
    const body = await request.json()
    console.log(body.nome)
    if (body.nome == '' || body.nome == undefined ) 
    {
      return HttpResponse.json({ error: 'O nome da tarefa é obrigatorio'}, { status: 422});
    }      
    
    const tarefa = {
      id: tarefas.length + 1,
      nome: body.nome,
      concluida: false
    }

    tarefas.push(tarefa)
    return HttpResponse.json(tarefa, { status: 201});
  }),
];
