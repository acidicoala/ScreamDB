// This code is only for TypeScript
import { QueryClient, QueryClientProvider, type UseQueryResult } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import("@tanstack/react-query").QueryClient;
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export function AppQueryClientProvider(props: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

interface QueryResultProps<TData> {
  query: UseQueryResult<TData>;
  loading: () => React.ReactNode;
  success: (data: TData) => React.ReactNode;
  error: () => React.ReactNode;
}

interface QueryResultPropsWithEmpty<TData> extends QueryResultProps<TData> {
  emptyCheck: (data: TData) => boolean;
  empty: () => React.ReactNode;
}

export function QueryResult<TData>(
  props: QueryResultProps<TData> | QueryResultPropsWithEmpty<TData>,
) {
  // isPending seems to occur when network is down
  if (props.query.isLoading || props.query.isPending || props.query.isPaused) {
    return props.loading();
  }
  if (props.query.isError) {
    return props.error();
  }

  if ("empty" in props && props.emptyCheck(props.query.data)) {
    return props.empty();
  }

  return props.success(props.query.data);
}
