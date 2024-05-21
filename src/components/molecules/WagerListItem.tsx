import { format } from "date-fns";
import { H2, H4, H6, SizableText, Text, XStack, YStack } from "tamagui";

const WagerListItem = ({ wager }: { wager: Wager }) => {
  const { bet, selectedOptionId, amount } = wager;
  const selectedOption = bet.options.find(
    (option) => option.id === selectedOptionId
  );

  return (
    <YStack
      alignSelf="stretch"
      backgroundColor={"$background"}
      borderRadius={"$10"}
      padding={"$4"}
    >
      <YStack>
        <H2>{selectedOption?.title}</H2>
        <H4>{bet.title}</H4>
      </YStack>

      <YStack>
        <SizableText>Wagered: {amount} coins</SizableText>
        <SizableText>To win: {wager.payout}</SizableText>
      </YStack>

      <XStack justifyContent="space-between">
        <H6>Ends: {format(bet.endDate, "MM/dd/yyy")}</H6>
        <Text>Odds: {selectedOption?.odds}</Text>
      </XStack>
    </YStack>
  );
};

export default WagerListItem;
