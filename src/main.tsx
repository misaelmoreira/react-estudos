import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/app/app.tsx";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Loading } from "./components/loading/loading.tsx";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

// Create a client
const queryClient = new QueryClient();

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <div style={{ margin: "0 auto", maxWidth: "768px" }}>
        <QueryClientProvider client={queryClient}>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                fallbackRender={({ error, resetErrorBoundary }) => (
                  <div>
                    <h3> Ocorreu um erro!</h3>
                    <button onClick={() => resetErrorBoundary()}>
                      Tente novamente
                    </button>
                    <pre style={{ whiteSpace: "normal" }}>{error.message}</pre>
                  </div>
                )}
                onReset={reset}
              >
                <React.Suspense fallback={<Loading />}>
                  <App />
                </React.Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </QueryClientProvider>
      </div>
    </React.StrictMode>
  );
});
