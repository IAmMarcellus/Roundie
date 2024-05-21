import { ChevronDown } from "@tamagui/lucide-icons";
import { format } from "date-fns";
import {
  Accordion,
  Button,
  H4,
  Separator,
  SizableText,
  Square,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";

type BetListItemProps = {
  bet: Bet;
  onBetOptionPress: (bet: Bet, option: BetOption) => void;
};

const BetListItem = ({ bet, onBetOptionPress }: BetListItemProps) => {
  return (
    <Accordion.Item value={bet.id}>
      <Accordion.Trigger flexDirection="row" justifyContent="space-between">
        {({ open }: { open: boolean }) => (
          <>
            <YStack>
              <H4>{bet.title}</H4>
              <SizableText>
                Ends: {format(bet.endDate, "MM/dd/yyy")}
              </SizableText>
            </YStack>
            <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
              <ChevronDown size="$1" />
            </Square>
          </>
        )}
      </Accordion.Trigger>
      <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
        <YStack>
          {bet.options.map((option, index) => (
            <View key={option.id}>
              <XStack key={index} justifyContent="space-between">
                <YStack>
                  <Text>{option.title}</Text>
                  <Text>{option.odds}</Text>
                </YStack>
                <Button
                  onPress={() => onBetOptionPress(bet, option)}
                  backgroundColor="$accentBackground"
                >
                  Bet
                </Button>
              </XStack>
              <Separator marginVertical={10} />
            </View>
          ))}
        </YStack>
      </Accordion.Content>
    </Accordion.Item>
  );
};

export default BetListItem;
