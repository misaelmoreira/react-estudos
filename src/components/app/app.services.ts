import { client } from "../../api/client";

type Tarefa = {
  id: number
  nome: string
  concluida: boolean
};

type UpdateTarefa = Partial<Pick<Tarefa, "nome" | "concluida">> & Pick<Tarefa, "id">

export const getTarefas = (): Promise<Tarefa[]> => 
  client.get('/tarefas').then(res => res.data)

export const addTarefa = (nome: string) => 
  client.post('/tarefas', { nome }).then(res => res.data)

export const updateTarefa = ({
  id,
  nome,
  concluida,
}: UpdateTarefa) => 
  client.patch(`/tarefas/${id}`, { nome, concluida }).then(res => res.data)
