import { useMutation } from "@tanstack/react-query";

export function useMutations(mutationConfigs) {
  return mutationConfigs.map((config) => useMutation(config));
}
