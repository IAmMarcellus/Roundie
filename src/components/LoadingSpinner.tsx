import { YStack, Spinner } from "tamagui";

const LoadingSpinner = () => (
  <YStack flex={1} alignItems="center" justifyContent="center">
    <Spinner size="large" />
  </YStack>
);

export default LoadingSpinner;
