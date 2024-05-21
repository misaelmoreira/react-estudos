import { render, screen, mockNextRouter, waitFor } from "../../utils/test-utils";
import { IsAuthenticated } from "./is-authenticated";
const router = mockNextRouter({ pathname: '/redirect'})

describe("<IsAuthenticated />", () => {
  it("deve redirecionar o usuário para a página de login quando ele não estiver autenticado", async () => {
    render(<IsAuthenticated>mock_content</IsAuthenticated>);    
    
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith(`/login?redirectPath=/redirect`)
    })
  })  

  it("deve renderizar os componentes filhos", async () => {
    global.localStorage.setItem('token', 'mock_token');

    render(<IsAuthenticated>Apenas para usuarios Autenticados</IsAuthenticated>);   

    expect(screen.getByText('Apenas para usuarios Autenticados')).toBeInTheDocument();
    global.localStorage.removeItem('token');
  })
});