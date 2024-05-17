import { Button } from "../../components/button/button";
import { Grid } from "../../components/grid/grid";
import { Heading } from "../../components/heading";
import { Input } from "../../components/input/input";
import { serializeFormData } from "../../utils/serialize-form-data";
import { useLogin } from "./login.hooks";

type FormElements = {
  email: HTMLInputElement;
  senha: HTMLInputElement;
} & HTMLFormControlsCollection;

type UserNameFormElement = {
  readonly elements: FormElements;
} & HTMLFormElement;

export const Login = () => {
  const mutation = useLogin();

  const handleOnSubmit = (event: React.FormEvent<UserNameFormElement>) => {
    event.preventDefault();
    const credentials = serializeFormData(event.currentTarget) as {
      usuario: string;
      senha: string;
    };

    mutation.mutate(credentials, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  };

  return (
    <Grid>
      <div>
        <Heading as="h2">Entre na sua conta</Heading>
        {mutation?.error?.response?.data?.title &&
          mutation?.error?.response?.data?.title}

        <form onSubmit={handleOnSubmit}>
          <Input
            label="Usuario"
            required
            error="Usuario invalido"
            name="usuario"
          />
          <Input
            label="senha"
            type="password"
            required
            error="Digite sua senha"
            name="senha"
          />
          <Button>Entrar</Button>
        </form>
      </div>
    </Grid>
  );
};
