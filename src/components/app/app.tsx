import React from "react";
import { addTarefa, updateTarefa } from "./services";
import { useTarefas } from "./app.hooks";

export function App() {
  const { data: tarefas, refetch } = useTarefas();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nome = formData.get("nome") as string;

    addTarefa(nome).then(() => {
      refetch();
    });
  };

  return (
    <div>
      <h1>Tarefas</h1>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="nome" />
        <button type="submit">Adicionar tarefa</button>
      </form>

      {tarefas && Array.isArray(tarefas) ? (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <input
                type="checkbox"
                onClick={() =>
                  updateTarefa({
                    id: tarefa.id,
                    concluida: !tarefa.concluida,
                  }).then(() => refetch())
                }
              />
              {tarefa.concluida ? <del>{tarefa.nome}</del> : tarefa.nome}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
