import { Button } from "../../components/button/button";
import { Grid } from "../../components/grid/grid";
import { Heading } from "../../components/heading";
import { Input } from "../../components/input/input";
import { serializeFormData } from "../../utils/serialize-form-data";

type FormElements = {
    email: HTMLInputElement
    senha: HTMLInputElement
} & HTMLFormControlsCollection

type  UserNameFormElement = {
    readonly elements: FormElements
} & HTMLFormElement

export const Login = () => {
  const handleOnSubmit = (event: React.FormEvent<UserNameFormElement>) => {
    event.preventDefault();

    serializeFormData(event.currentTarget);
  };

  return (
    <Grid>
      <div>
        <Heading as="h2">Entre na sua conta</Heading>

        <form onSubmit={handleOnSubmit}>
          <Input
            label="E-mail"
            type="email"
            required
            error="E-mail invalido"
            name="email"
          />
          <Input
            label="senha"
            type="password"
            required
            error="Digite sua senha"
            name="password"
          />
          <Button>Entrar</Button>
        </form>
      </div>
    </Grid>
  );
};
