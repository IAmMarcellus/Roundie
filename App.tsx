import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";
import { TamaguiProvider, createTamagui } from "tamagui";
import { config } from "@tamagui/config/v3";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LoadingSpinner from "./src/components/LoadingSpinner";

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
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      )}
    </TamaguiProvider>
  );
}

export default App;
