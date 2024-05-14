import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getTarefas } from "./services";

export const useTarefas = () => {
  return useSuspenseQuery({
    queryKey: ["getTarefas"],
    queryFn: getTarefas
  });
};
