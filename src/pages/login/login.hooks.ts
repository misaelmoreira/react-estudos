import { useMutation } from "@tanstack/react-query";
import { client } from "../../api/client";

// RFC 7807
type ProblemDetails = {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  instance: string;
  invalidParams: {
    name: string;
    reason: string;
  }[];
};

type User = {
  id: number;
  nome: string;
  email: string;
  token: string;
};

type Credentials = { usuario: string; senha: string };

const login = ({ usuario, senha }: Credentials) =>
  client
    .post<ProblemDetails | User>("/api/login", { usuario, senha })
    .then((res) => res.data);

export const useLogin = () => 
  useMutation({
    mutationFn: login,
  })
