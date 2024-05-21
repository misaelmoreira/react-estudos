import { useRef } from "react";
import { useAddTarefa, useTarefas, useUpdateTarefa } from "./task.hooks";
import { Button } from "../../../components/button/button";
import { Heading } from "../../../components/heading";

export function Tasks() {
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
      <Heading>Tarefas</Heading>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="nome">Adicionar Tarefa</label>
        <input 
          type="text" 
          name="nome" 
          ref={inputRef}
          id="nome"
        />
        <Button type="submit">Adicionar</Button>
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
              <label>
                <input
                  type="checkbox"
                  onClick={() =>
                    updateTarefa({ id: tarefa.id, concluida: !tarefa.concluida })
                  }
                  defaultChecked={tarefa.concluida}
                />
                {tarefa.concluida ? <del data-testid={`tarefa-concluida-${tarefa.id}`}>{tarefa.nome}</del> : tarefa.nome}
              </label>              
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};