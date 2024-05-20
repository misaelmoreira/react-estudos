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
import { Login } from "./pages/login/login.tsx";
import { Logout } from "./pages/logout/logout.tsx";
import { Dashboard } from "./pages/dashboard/dashboard.tsx";
import { IsAuthenticated } from "./components/is-authenticated/is-authenticated.tsx";
import { Menu } from "./components/menu";

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
  <>
    {children}
    <React.Suspense fallback={<Loading />}>
      <Outlet />
    </React.Suspense>
  </>
);

const AppRoutes = () => (
  <Routes>    
    <Route path="login" element={<Login />} />
    <Route path="logout" element={<Logout />} />
    <Route path="dashboard" element={<IsAuthenticated />}>  
      <Route element={<Menu />}>
        <Route path="tasks" element={<Tasks />} />    
        <Route index element={<Dashboard />} />
      </Route>                 
    </Route>
  </Routes>
);
