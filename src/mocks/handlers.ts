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

const getTarefas = (id: number) => tarefas.find((t) => t.id == id);

export const handlers = [
  http.get("http://localhost:3000/tarefas", async () => {
    return HttpResponse.json(tarefas);
  }),
  http.post<{ nome: string }>(
    "http://localhost:3000/tarefas",
    async ({ request }) => {
      const body = await request.json();
      console.log(body.nome);
      if (body.nome == "" || body.nome == undefined) {
        return HttpResponse.json(
          { error: "O nome da tarefa é obrigatorio" },
          { status: 422 }
        );
      }

      const tarefa = {
        id: tarefas.length + 1,
        nome: body.nome,
        concluida: false,
      };

      tarefas.push(tarefa);
      return HttpResponse.json(tarefa, { status: 201 });
    }
  ),
  http.patch<{ nome?: string; concluida?: boolean }>(
    "http://localhost:3000/tarefas/:id",
    async ({ params, request }) => {
      const body = await request.json();
      const { id } = params;
      const tarefa = getTarefas(id);

      if (!tarefa) {
        return HttpResponse.json(
          { error: "Tarefa não encontrada" },
          { status: 404 }
        );
      }

      if (body.nome) {
        tarefa.nome = body.nome;
      }

      if (body.concluida != undefined) {
        tarefa.concluida = body.concluida;
      }

      tarefas.map((t) => {
        if (t.id == id) {
          return {
            ...t,
            ...tarefa,
          };
        }
        return t;
      });

      return HttpResponse.json(tarefa, { status: 201 });
    }
  ),
  http.post<{ usuario: string; senha: string }>(
    "http://localhost:3000/api/login",
    async ({ request }) => {
      const { usuario, senha } = await request.json();
      if (usuario === 'admin' && senha === 'admin') {
        return HttpResponse.json(
          { token: "Zat3JvS1xODHVOWz13gcMSiLJ4zUekjB3qE2w4Ax8IWpmPB4AeJWsBOYfmpdJRv5" },
          { status: 200 }
        );
      }

      const errors = []

      if (usuario != 'admin') {
        errors.push({
          name: "usuario",
          reason: "usuario invalido"
        })
      }

      if (senha != 'admin') {
        errors.push({
          name: "senha",
          reason: "senha invalida"
        })
      }

      return HttpResponse.json(
        { 
          type: "http://localhost:3000/api/login",
          title: "Credenciais Invalidas",
          invalidParams: errors
        },
        { status: 401 }
      );
    }
  )
];
