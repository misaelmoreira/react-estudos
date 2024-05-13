import { render, screen } from '@testing-library/react'
import  App  from './App'

describe('<App />', () => {
    it('deve renderizar o component', async () => {
        const { container } = render(<App />)

        expect(await screen.findByText('Tarefas')).toBeInTheDocument()
        expect(await screen.findByRole('heading', { name: 'Tarefas' })).toBeInTheDocument()
        expect(container).toMatchSnapshot()

        expect(await screen.findByText('Estudar React:')).toBeInTheDocument()
        expect(await screen.findByText('Estudar Typescript:')).toBeInTheDocument()
    })
})