import { useRef, useState } from "react";
import { useAddTarefa, useTarefas, useUpdateTarefa } from "./app.hooks";

export function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const addTarefa = useAddTarefa();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    addTarefa(formData.get("nome") as string);
    if (inputRef.current?.value) {
      inputRef.current.value = ''
    }
  };

  return (
    <div>
      <h1>Tarefas</h1>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="nome">Adicionar Tarefa</label>
        <input 
          type="text" 
          name="nome" 
          ref={inputRef}
          id="nome"
        />
        <button type="submit">Adicionar</button>
        <ListaDeTarefas />
      </form>
    </div>
  );
}

const ListaDeTarefas = () => {
  const { data: tarefas } = useTarefas();
  const updateTarefa = useUpdateTarefa();

  return (
    <>
      {Array.isArray(tarefas) ? (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <input
                type="checkbox"
                onClick={() =>
                  updateTarefa({ id: tarefa.id, concluida: !tarefa.concluida })
                }
                defaultChecked={tarefa.concluida}
              />
              {tarefa.concluida ? <del>{tarefa.nome}</del> : tarefa.nome}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};