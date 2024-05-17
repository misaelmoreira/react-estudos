import { Tasks } from "./pages/tasks/tasks.tsx"
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import { Loading } from "./components/loading/loading.tsx";
import React from "react";
import { Routes, Route } from 'react-router-dom'

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
                      <pre style={{ whiteSpace: "normal" }} > {error.message}</pre>
                  </div>                  
              )}
              onReset={reset}
            >
                <AppRoutes />              
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
)

const AppRoutes = () => (
    <div className="container">
        <Routes>
            <Route path="tasks" 
                element={
                <React.Suspense fallback={<Loading />}>
                    <Tasks />                
                </React.Suspense>
                } 
            />            
        </Routes>
    </div>
)