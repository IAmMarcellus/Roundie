import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { TamaguiProvider } from "tamagui";

import CurrentToast from "components/molecules/Taost";
import TabNavigator from "navigation/TabNavigator";
import tamaguiConfig from "theme/tamagui.config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      staleTime: Infinity,
      networkMode: "offlineFirst",
      refetchOnMount: false, // Disabled for use with mock data
      refetchOnReconnect: false, // Disabled for use with mock data
    },
  },
});
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: Infinity,
      }}
    >
      <TamaguiProvider config={tamaguiConfig}>
        <ToastProvider>
          <NavigationContainer>
            <TabNavigator />
            <CurrentToast />
            <ToastViewport />
          </NavigationContainer>
        </ToastProvider>
      </TamaguiProvider>
    </PersistQueryClientProvider>
  );
}

export default App;
