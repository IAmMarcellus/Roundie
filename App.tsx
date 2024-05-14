import { NavigationContainer } from "@react-navigation/native";
import { config } from "@tamagui/config/v3";
import { ToastProvider } from "@tamagui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TamaguiProvider, createTamagui } from "tamagui";

import LoadingSpinner from "./src/components/LoadingSpinner";
import TabNavigator from "./src/navigation/TabNavigator";

const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

const queryClient = new QueryClient();

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const enableMocking = async () => {
      await import("./msw.polyfills");
      const { server } = await import("./src/mocks/server");
      server.listen();
    };

    enableMocking().then(() => setLoading(false));
  }, [setLoading]);

  return (
    <TamaguiProvider config={tamaguiConfig}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        </ToastProvider>
      )}
    </TamaguiProvider>
  );
}

export default App;
