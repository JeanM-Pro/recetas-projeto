import React from "react";
import { AppRouter } from "./router/AppRouter";
import { ContextProvider } from "./context/ContextProvider";

export const App = () => {
  return (
    <ContextProvider>
      <AppRouter />;
    </ContextProvider>
  );
};
