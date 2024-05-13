import { useState } from "react"

const tarefas = [
  {
    id: 1,
    nome: "Estudar React",
    concluida: false
  },
  {
    id: 2,
    nome: "Estudar Typescript",
    concluida: false 
  }
]


function App() {
  const { tarefas, setTarefas } = useState;
  return (
    <div>
      <h1>Tarefas</h1>

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa.id}>
            {tarefa.nome}
            {tarefa.concluida ? ' YES' : ' NO'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
