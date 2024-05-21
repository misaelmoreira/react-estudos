import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { client } from "../../../api/client";

type Tarefa = {
  id: number;
  nome: string;
  concluida: boolean;
};

type UpdateTarefa = Partial<Pick<Tarefa, "nome" | "concluida">> &
  Pick<Tarefa, "id">;

const getTarefas = (): Promise<Tarefa[]> =>
  client.get("/tarefas").then((res) => res.data);

const addTarefa = (nome: string) =>
  client.post("/tarefas", { nome }).then((res) => res.data);

const updateTarefa = ({ id, nome, concluida }: UpdateTarefa) =>
  client.patch(`/tarefas/${id}`, { nome, concluida }).then((res) => res.data);

export const useTarefas = () =>
  useSuspenseQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas,
  });

export const useAddTarefa = () => {
  const mutation = useMutation({
    mutationFn: addTarefa,
  });
  const queryClient = useQueryClient();

  return (nome: string) =>
    mutation.mutate(nome, {
      onSuccess: (data) => {
        console.log(data);
        queryClient.setQueryData(["tarefas"], (tarefas: Tarefa[]) => [
          ...(tarefas as Tarefa[]),
          data,
        ]);
      },
    });
};

export const useUpdateTarefa = () => {
  const mutation = useMutation({
    mutationFn: updateTarefa,
  });
  const queryClient = useQueryClient();

  return (tarefa: Pick<Tarefa, "id"> & Partial<Omit<Tarefa, "id">>) =>
    mutation.mutate(tarefa, {
      onSuccess: (data) => {
        queryClient.setQueryData(["tarefas"], (tarefas: Tarefa[]) =>
          (tarefas as Tarefa[]).map((t) => {
            if (t.id == data.id) {
              return data;
            }
            return t;
          })
        );
      },
    });
};
