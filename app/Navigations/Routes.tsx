import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "../contexts/app.context";
import StackNavigator from "./StackNavigator";

const Routes = () => {
  const queryClient = new QueryClient();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <StackNavigator />
        </AppProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
};
export default Routes;
