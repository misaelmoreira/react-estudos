import { render, screen, userEvent } from "../../utils/test-utils";
import { Tasks } from "./tasks";

describe("<Tasks />", () => {
  it("deve renderizar o component", async () => {
    render(<Tasks />); 

    expect(await screen.findByRole("heading", { name: "Tarefas" })).toBeInTheDocument();    
    expect(await screen.getByText("Estudar React:")).toBeInTheDocument();
    expect(await screen.getByText("Estudar Typescript:")).toBeInTheDocument(); 

    await userEvent.type(screen.getByLabelText('Adicionar Tarefa'), 'Estudar GraphQL')
    await userEvent.click(screen.getByText('Adicionar')) 
    expect(await screen.findByText("Estudar GraphQL")).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText('Estudar GraphQL'));    
    expect(await screen.getByTestId("tarefa-concluida-3")).toBeInTheDocument(); 
    
    await userEvent.click(screen.getByLabelText('Estudar GraphQL'));    
    //await waitForElementToBeRemoved(() => screen.findByTestId("tarefa-concluida-3"))    
  })  
});
