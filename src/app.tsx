import { Tasks } from "./pages/tasks/tasks.tsx";
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { Loading } from "./components/loading/loading.tsx";
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Login } from "./pages/login/index.tsx";

// Create a client
const queryClient = new QueryClient();

export const App = () => (
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
              <pre style={{ whiteSpace: "normal" }}> {error.message}</pre>
            </div>
          )}
          onReset={reset}
        >
          <Container>
            <AppRoutes />
          </Container>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  </QueryClientProvider>
);

type ContainerProps = {
  children?: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="container">
    {children}
    <React.Suspense fallback={<Loading />}>
      <Outlet />
    </React.Suspense>
  </div>
);

const AppRoutes = () => (
  <Routes>
    <Route path="tasks" element={<Tasks />} />
    <Route path="login" element={<Login />} />
  </Routes>
);
