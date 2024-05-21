import { render, screen } from "../../../utils/test-utils";
import { Tasks } from "./tasks";

describe("<Tasks />", () => {
  it("deve renderizar o component", async () => {
    const { user } = render(<Tasks />); 

    expect(await screen.findByRole("heading", { name: "Tarefas" })).toBeInTheDocument();    
    expect(await screen.getByText("Estudar React:")).toBeInTheDocument();
    expect(await screen.getByText("Estudar Typescript:")).toBeInTheDocument(); 

    await user.type(screen.getByLabelText('Adicionar Tarefa'), 'Estudar GraphQL')
    await user.click(screen.getByText('Adicionar')) 
    expect(await screen.findByText("Estudar GraphQL")).toBeInTheDocument();

    await user.click(screen.getByLabelText('Estudar GraphQL'));    
    expect(await screen.getByTestId("tarefa-concluida-3")).toBeInTheDocument(); 
    
    await user.click(screen.getByLabelText('Estudar GraphQL'));    
    //await waitForElementToBeRemoved(() => screen.findByTestId("tarefa-concluida-3"))    
  })  
});
