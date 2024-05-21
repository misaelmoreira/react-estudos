import { mockNextRouter, render, screen, waitFor } from "../../utils/test-utils";
import { Login } from "./login";

const router = mockNextRouter()

describe("<Login />", () => {
  it("nao deve permitir o envio de formulario sem um usuario e senha", async () => {
    const { user } = render(<Login />); 

    user.tab()
    user.tab()
    user.tab()

    await waitFor(() => {
        expect(screen.getByText("Usuario invalido")).toBeInTheDocument();   
    })

    await waitFor(() => {
        expect(screen.getByText("Digite sua senha")).toBeInTheDocument();   
    }) 
    
  })  

  it("deve emitir mensagem de erro quando as credenciais forem invalidas", async () => {    
    const { user } = render(<Login />); 

    await user.type(screen.getByLabelText('Usuario'), 'Teste') 
    await user.type(screen.getByLabelText('Senha'), 'Teste') 

    await user.click(screen.getByText('Entrar')); 

    await waitFor(() => {
      expect(screen.getByText('Credenciais Invalidas')).toBeInTheDocument();   
    }) 
  })


  it("deve fazer login do usuario e redirecionar para o /dashboard", async () => {
    const router = mockNextRouter({ pathname: "/login"})
    const { user } = render(<Login />); 
    

    await user.type(screen.getByLabelText('Usuario'), 'admin')    
    await user.type(screen.getByLabelText('Senha'), 'admin')
    await user.click(screen.getByText('Entrar')) 

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/dashboard')  
    })
  }) 

  it("deve redirecionar o  usuario para URL presente em ?redirectPath=", async () => {
    const router = mockNextRouter({ pathname: "/login?redirectPath=/dashboard"})
    const { user } = render(<Login />);     

    await user.type(screen.getByLabelText('Usuario'), 'admin')    
    await user.type(screen.getByLabelText('Senha'), 'admin')
    await user.click(screen.getByText('Entrar')) 

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/dashboard')   
    }) 
  })
})
