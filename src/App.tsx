import React, { useState, useEffect } from "react"

// Pode fazer com type e interface
type AcaoProps = {
  concluida?: boolean
} & React.ComponentProps<'button'>

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

function Acao({ concluida, ...props }: AcaoProps) {
  return <button {...props}>{concluida ? 'YES' : 'NO'}</button>
}

function App() {
  const [ tarefas, setTarefas ] = useState<Tarefa[]>([])

  useEffect(() => {
    getTarefas().then(setTarefas)
  }, [])

  const marcarComoConcluida = (id: number) => {
    setTarefas(tarefas.map(tarefa => {
      if(tarefa.id === id){
        return {
          ...tarefa,
          concluida: !tarefa.concluida
        }
      }
      return tarefa
    }))
  }

  const handleOnSubmit = ( event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const nome = formData.get('nome') as string

    addTarefa(nome).then(() => {
      getTarefas().then(setTarefas)
    })
    
  }

  return (
    <div>
      <h1>Tarefas</h1>

      <ul>
        {tarefas.length > 0 ? tarefas.map(tarefa => (
          <li key={tarefa.id}>
            {tarefa.nome} 
            <Acao 
              concluida={tarefa.concluida} 
              onClick={() => {
                marcarComoConcluida(tarefa.id)
              }}
            />           
          </li>
        )) : 'Nenhuma tarefa cadastrada'}
      </ul>

      <form onSubmit={handleOnSubmit}>
        <input type="text" name="nome"/>
        <button type="submit">Adicionar tarefa</button>
      </form>
    </div>
  )
}

export default App
