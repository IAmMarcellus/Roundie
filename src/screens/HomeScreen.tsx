import { Button, H1, H2, H3, YStack } from "tamagui";

const HomeScreen = () => {
  // TODO: Mock this as an api response
  const currentBalance = 1000;

  return (
    <YStack>
      <H1>Roundie</H1>
      <YStack>
        <H2>Current Balance:</H2>
        <H3>{currentBalance}</H3>
      </YStack>
      <Button>Place a bet</Button>
    </YStack>
  );
};

export default HomeScreen;
