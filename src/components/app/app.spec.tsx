import { click } from "@testing-library/user-event/dist/cjs/convenience/click.js";
import { render, screen, waitFor, userEvent } from "../../utils/test-utils";
import { App } from "./app";

describe("<App />", () => {
  it("deve renderizar o component", async () => {
    render(<App />); 
    
    

    waitFor(() => {  
      expect(screen.getByRole("heading", { name: "Tarefas" })).toBeInTheDocument();
       
      expect(screen.getByText("Estudar React:")).toBeInTheDocument();
      expect(screen.getByText("Estudar Typescript:")).toBeInTheDocument();   
      
      userEvent.type(screen.getByLabelText('Adicionar Tarefa'), 'Estudar GraphQL')
      userEvent.click(screen.getByText('Adicionar')) 
    })   

    // await userEvent.type(screen.getByLabelText('Adicionar Tarefa'), 'Estudar GraphQL')
    // await userEvent.click(screen.getByText('Adicionar'))

    waitFor(() => {
      expect(screen.getByText("Estudar GraphQL")).toBeInTheDocument();
    })

    screen.debug()
  });
  
});
