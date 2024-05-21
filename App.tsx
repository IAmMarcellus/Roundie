import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { config } from "@tamagui/config/v3";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useEffect, useState } from "react";
import { TamaguiProvider, createTamagui } from "tamagui";

import LoadingSpinner from "components/atoms/LoadingSpinner";
import TabNavigator from "navigation/TabNavigator";
import tamaguiConfig from "theme/tamagui.config";

/*
const tamaguiConfig = createTamagui(config);

type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}
*/

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      refetchOnMount: false, // Disabled for use with mock data
      refetchOnReconnect: false, // Disabled for use with mock data
    },
  },
});
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

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
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: Infinity,
      }}
    >
      <TamaguiProvider config={tamaguiConfig}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ToastProvider>
            <NavigationContainer>
              <TabNavigator />
            </NavigationContainer>
            <ToastViewport />
          </ToastProvider>
        )}
      </TamaguiProvider>
    </PersistQueryClientProvider>
  );
}

export default App;
