import { FC, createContext, useContext } from "react";
import { Heading } from "../../components/heading";

type MyContext = {
  nome: string;
  idade: number;
  cidade: string;
}

const MyContext = createContext({} as MyContext)

const useMyContext = () => useContext(MyContext)

const Nome: FC = () => {
  const { nome } = useMyContext()
  return <p>{nome}</p>
}

const Idade: FC = () => {
  const { idade } = useMyContext()
  return <p>{idade}</p>
}

const Cidade: FC = () => {
  const { cidade } = useMyContext()
  return <p>{cidade}</p>
}

export const Dashboard = () => {
  const info = {
    nome: "João",
    idade: 20,
    cidade: "São Paulo"
  }

  return (
    <>
      <Heading>
        Dashboard
      </Heading>
      <MyContext.Provider value={info}>
        <Nome />
        <Idade />
        <Cidade />
      </MyContext.Provider>
    </>    
  );
}
