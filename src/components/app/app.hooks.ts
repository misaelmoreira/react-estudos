import { useMutation,  useSuspenseQuery } from "@tanstack/react-query";
import { addTarefa, getTarefas, updateTarefa } from "./app.services";

export const useTarefas = () => useSuspenseQuery({
    queryKey: ["tarefas"],
    queryFn: getTarefas
  })

export const useAddTarefa = () => useMutation({
  mutationFn: addTarefa
})

export const useUpdateTarefa = () => useMutation({
  mutationFn: updateTarefa
})