import { ChevronDown } from "@tamagui/lucide-icons";
import { Accordion, Button, H4, Square, Text, XStack, YStack } from "tamagui";

const BetListItem = ({ bet }: { bet: Bet }) => {
  return (
    <Accordion.Item value="a1">
      <Accordion.Trigger flexDirection="row" justifyContent="space-between">
        {({ open }: { open: boolean }) => (
          <>
            <H4>{bet.title}</H4>
            <Square animation="quick" rotate={open ? "180deg" : "0deg"}>
              <ChevronDown size="$1" />
            </Square>
          </>
        )}
      </Accordion.Trigger>
      <Accordion.HeightAnimator animation="medium">
        <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
          <YStack>
            {bet.options.map((option, index) => (
              <XStack key={index} justifyContent="space-between">
                <YStack>
                  <Text>{option.title}</Text>
                  <Text>{option.odds}</Text>
                </YStack>
                <Button>Bet</Button>
              </XStack>
            ))}
          </YStack>
        </Accordion.Content>
      </Accordion.HeightAnimator>
    </Accordion.Item>
  );
};

export default BetListItem;
