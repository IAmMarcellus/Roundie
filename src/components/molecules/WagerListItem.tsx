import { H4, H6, Text, YStack } from "tamagui";

const WagerListItem = ({ wager }: { wager: Wager }) => {
  const { bet, selectedOptionId, amount } = wager;
  const selectedOption = bet.options.find(
    (option) => option.id === selectedOptionId
  );

  return (
    <YStack>
      <H4>{bet.title}</H4>
      <H6>Ends: {bet.endDate}</H6>
      <YStack>
        <Text>{selectedOption?.title}</Text>
        <Text>{selectedOption?.odds}</Text>
        <Text>Amount: {amount}</Text>
      </YStack>
    </YStack>
  );
};

export default WagerListItem;
