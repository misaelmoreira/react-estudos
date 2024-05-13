import React from "react"
import { useQuery } from '@tanstack/react-query'

type Tarefa = {
  id: number,
  nome: string,
  concluida: boolean
}


const getTarefas = (): Promise<Tarefa[]> => {
  return fetch('/tarefas').then(response => response.json())
}

const addTarefa = (nome: string) => {
  return fetch('/tarefas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome })
  }).then(response => response.json())
}

const updateTarefa = ({ id, nome, concluida }: Partial<Pick<Tarefa, 'nome' | 'concluida'>> & Pick<Tarefa, 'id'>) => {
  return fetch(`/tarefas/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, concluida })
  }).then(response => response.json())
}

function App() {
  const { data: tarefas, error: erro, isLoading: carregando, refetch } = useQuery<Tarefa[]>({
    queryKey: ['getTarefas'],
    queryFn: getTarefas
  });

  const marcarComoConcluida = (id: number) => {
    updateTarefa({ id, concluida: true }).then(() => refetch())
  }

  const handleOnSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nome = formData.get('nome') as string

    addTarefa(nome).then(() => {
      refetch()
    })    
  }

  return (
    <div>
      <h1>Tarefas</h1>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="nome"/>
        <button type="submit">Adicionar tarefa</button>
      </form>

      {carregando ? <p>Carregando....</p> : null}
      {erro ? <p>Ocorreu um erro ....</p> : null}

      <ul>
        {tarefas && Array.isArray(tarefas) ? tarefas.map(tarefa => (
          <li key={tarefa.id}>
            <input type="checkbox" onClick={() => marcarComoConcluida(tarefa.id)} />
            {tarefa.concluida ? <del>{tarefa.nome}</del> : tarefa.nome}        
          </li>
        )) : 'Nenhuma tarefa cadastrada'}
      </ul>      
    </div>
  )
}

export default App
