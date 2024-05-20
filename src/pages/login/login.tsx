import { useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../components/button/button";
import { Heading } from "../../components/heading";
import { Input } from "../../components/input/input";
import { serializeFormData } from "../../utils/serialize-form-data";
import { useLogin } from "./login.hooks";
import * as styles from "./login.module.css";
import { setToken } from "../../utils/token";

type FormElements = {
  email: HTMLInputElement;
  senha: HTMLInputElement;
} & HTMLFormControlsCollection;

type UserNameFormElement = {
  readonly elements: FormElements;
} & HTMLFormElement;

export const Login = () => {
  const mutation = useLogin();
  const errorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const setErrorHiddenStatus = (status: boolean) => {
    if (errorRef.current) {
      errorRef.current.hidden = status;
    }
  };

  const handleOnSubmit = (event: React.FormEvent<UserNameFormElement>) => {
    event.preventDefault();
    const credentials = serializeFormData(event.currentTarget) as {
      usuario: string;
      senha: string;
    };

    mutation.mutate(credentials, {
      onSuccess: (data) => {
        setToken(data.token);
        const redirectPath = searchParams.get("redirectPath");

        navigate(redirectPath ? redirectPath : "/dashboard");
      },
      onError: () => {
        setErrorHiddenStatus(false);
      },
    });
  };

  return (
    <div className={styles.formContainer}>
      <Heading as="h2">Entre na sua conta</Heading>

      <form onSubmit={handleOnSubmit}>
        <div className={styles.errorContainer} ref={errorRef} hidden>
          {mutation?.error?.title && mutation?.error?.title}
        </div>

        <Input
          label="Usuario"
          required
          error="Usuario invalido"
          name="usuario"
          onBlur={() => setErrorHiddenStatus(true)}
          id="Usuario"
        />
        <Input
          label="Senha"
          type="password"
          required
          error="Digite sua senha"
          name="senha"
          onBlur={() => setErrorHiddenStatus(true)}
          id="Senha"
        />
        <Button>Entrar</Button>
      </form>
    </div>
  );
};
