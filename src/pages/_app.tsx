import type { AppProps } from "next/app";
import {  
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import React from "react";
import { Loading } from "../components/loading/loading";

if(process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'){
  await import('../mocks')
}

type ContainerProps = {
  children?: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => (
  <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
);

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        suspense: true,
      },
    }
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {/* <Hydrate state={pageProps.dehydratedState}> */}
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <div>
                  <h3> Ocorreu um erro!</h3>
                  <button onClick={() => resetErrorBoundary()}>
                    Tente novamente
                  </button>
                  <pre style={{ whiteSpace: "normal" }}> {error.message}</pre>
                </div>
              )}
              onReset={reset}
            >
              <Container>
                <Component {...pageProps} />
              </Container>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      {/* </Hydrate> */}
    </QueryClientProvider>
  );
}
