import { render, screen } from '@testing-library/react'
import  { App }  from './app'

describe('<App />', () => {
    it('deve renderizar o component', async () => {
        render(<App />)

        expect(await screen.findByText('Tarefas')).toBeInTheDocument()
        expect(await screen.findByRole('heading', { name: 'Tarefas' })).toBeInTheDocument()

        expect(await screen.findByText('Estudar React:')).toBeInTheDocument()
        expect(await screen.findByText('Estudar Typescript:')).toBeInTheDocument()
    })
})