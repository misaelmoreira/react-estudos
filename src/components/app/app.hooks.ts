import { useQuery } from "@tanstack/react-query";
import { getTarefas } from "./services";

export const useTarefas = () => {
  return useQuery({
    queryKey: ["getTarefas"],
    queryFn: getTarefas,
  });
};
