import { useQueryClient } from "@tanstack/react-query";
import { useAddTarefa, useTarefas, useUpdateTarefa } from "./app.hooks";

export function App() {
  const addTarefa = useAddTarefa();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nome = formData.get("nome") as string;

    addTarefa.mutate(nome);
  };

  return (
    <div>
      <h1>Tarefas</h1>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="nome" />
        <button type="submit">Adicionar tarefa</button>
        <ListaDeTarefas />
      </form>
    </div>
  );
}

const ListaDeTarefas = () => {
  const queryClient = useQueryClient();
  const { data: tarefas } = useTarefas();
  const updateTarefa = useUpdateTarefa();

  // const handleOnClick = () => {

  // }

  return (
    <>
      {Array.isArray(tarefas) ? (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <input
                type="checkbox"
                onClick={() =>
                  updateTarefa.mutate(
                    {
                      id: tarefa.id,
                      concluida: !tarefa.concluida
                    },
                    {
                      onSuccess: (data) => queryClient.setQueryData(
                        ['tarefas', { id: tarefa.id }], 
                        data
                      )
                    }
                  )
                }
              />
              {tarefa.concluida ? <del>{tarefa.nome}</del> : tarefa.nome}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};
