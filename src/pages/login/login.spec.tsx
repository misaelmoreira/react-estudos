import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, userEvent, waitFor } from "../../utils/test-utils";
import { Login } from "./index";

const App = ({ initialEntry = '/'}: { initialEntry?: string}) => (
  <MemoryRouter initialEntries={[initialEntry]}>
    <Routes>
      <Route path="/dashboard" element={<div data-testid="dashboard" />} />
      <Route path="/redirect" element={<div data-testid="redirect" />} />
      <Route path="/" element={<Login />} />
    </Routes> 
  </MemoryRouter>
)

describe("<Login />", () => {
  it("nao deve permitir o envio de formulario sem um usuario e senha", async () => {
    render(<App />); 

    userEvent.tab()
    userEvent.tab()
    userEvent.tab()

    await waitFor(() => {
        expect(screen.getByText("Usuario invalido")).toBeInTheDocument();   
    })

    await waitFor(() => {
        expect(screen.getByText("Digite sua senha")).toBeInTheDocument();   
    }) 
    
  })  

  it("deve emitir mensagem de erro quando as credenciais forem invalidas", async () => {
    render(<App />); 

    await userEvent.type(screen.getByLabelText('Usuario'), 'Teste') 
    await userEvent.type(screen.getByLabelText('Senha'), 'Teste') 

    await userEvent.click(screen.getByText('Entrar')); 

    await waitFor(() => {
      expect(screen.getByText('Credenciais Invalidas')).toBeInTheDocument();   
    }) 
  })


  it("deve fazer login do usuario e redirecionar para o /dashboard", async () => {
    render(<App />); 

    await userEvent.type(screen.getByLabelText('Usuario'), 'admin')    
    await userEvent.type(screen.getByLabelText('Senha'), 'admin')
    await userEvent.click(screen.getByText('Entrar')) 

    await waitFor(() => {
      expect(screen.getByTestId('dashboard')).toBeInTheDocument();   
    })
  }) 

  it("deve redirecionar o  usuario para URL presente em ?redirectPath=", async () => {
    render(<App initialEntry="/?redirectPath=/redirect"/>); 

    await userEvent.type(screen.getByLabelText('Usuario'), 'admin')    
    await userEvent.type(screen.getByLabelText('Senha'), 'admin')
    await userEvent.click(screen.getByText('Entrar')) 

    await waitFor(() => {
      expect(screen.getByTestId('redirect')).toBeInTheDocument();   
    }) 
  })
})
