import {
  QueryHookOptions,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import {
  ApolloCache,
  DefaultContext,
  OperationVariables,
} from "@apollo/client/core";
import {
  MutationHookOptions,
  MutationTuple,
  QueryResult,
  QueryTuple,
} from "@apollo/client/react/types/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import {
  EMojitoMutations,
  EMojitoQueries,
  mojitoMutations,
  mojitoQueries,
} from "@state";

export function useMojito<T = any, D = OperationVariables>(
  query: EMojitoQueries,
  options?: QueryHookOptions<T, D>
): QueryResult<T, D> {
  const result = useQuery<T, D>(mojitoQueries[query], options);

  return result;
}

export function useLazyMojito<T = any, D = OperationVariables>(
  query: EMojitoQueries,
  options?: QueryHookOptions<T, D>
): QueryTuple<T, D> {
  const result = useLazyQuery<T, D>(mojitoQueries[query], options);

  return result;
}

export function useMojitoMutation<T = any, D = OperationVariables>(
  query: EMojitoMutations,
  options?: MutationHookOptions<T, D>
): MutationTuple<T, D, DefaultContext, ApolloCache<any>> {
  return useMutation<T, D>(mojitoMutations[query], options);
}


export function useFetchAfterAuth(cb: () => void): boolean {
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) cb();
  }, [isAuthenticated]);
  return isLoading;
}
