import { useMojitoMutation } from "hooks";
import { ILotData } from "interfaces";
import { EMojitoMutations } from "state";
import { useCallback } from "react";
import {
  ApolloCache,
  DefaultContext,
  OperationVariables,
} from "@apollo/client/core";
import { MutationTuple } from "@apollo/client/react/types/types";

export function usePlaceBidMutation<T = any, D = OperationVariables>(
  lotData: ILotData
): MutationTuple<T, D, DefaultContext, ApolloCache<any>> {
  const [mutateFunction, mutateStatus] = useMojitoMutation<T, D>(
    EMojitoMutations.createBid
  );

  const mutateFunctionWithSegment = useCallback(
    (options: Parameters<typeof mutateFunction>[0]) => {
      return mutateFunction(options).then((result) => {
        return result;
      });
    },
    [mutateFunction, lotData]
  );

  return [mutateFunctionWithSegment, mutateStatus];
}
