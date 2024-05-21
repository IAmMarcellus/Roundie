import { useToastController } from "@tamagui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";
import { Button, H4, Text, XStack, YStack } from "tamagui";

import Sheet, { SheetProps } from "components/molecules/Sheet";
import useBetData from "hooks/useBetData";
import calcPayout from "utils/calcPayout";
import { QUERY_KEYS } from "utils/constants";

interface PlaceBetSheetProps extends SheetProps {
  bet: Bet;
  option: BetOption;
}

const PlaceBetSheet = ({
  isOpen,
  open,
  close,
  bet,
  option,
}: PlaceBetSheetProps) => {
  const [payout, setPayout] = useState(0);

  const toast = useToastController();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: 0,
    },
  });

  const { createWager } = useBetData();
  const queryClient = useQueryClient();
  const createWagerMutation = useMutation({
    mutationFn: createWager,
    onSuccess: ({ data: newWager }) => {
      queryClient.setQueryData<Wager[]>([QUERY_KEYS.WAGERS], (oldWagers) => [
        ...(oldWagers || []),
        newWager,
      ]);
      // In a real app, we would update the wallet amount on the server when the bet
      queryClient.setQueryData<Wallet>([QUERY_KEYS.WALLET], (oldWallet) => {
        const newWalletAmount = (oldWallet?.amount || 1000) - newWager.amount;
        return { amount: newWalletAmount };
      });
      toast.show("Bet created!", {
        message: "New bet successfully created",
        native: true,
      });
      // TODO: Reset form state?
      // TODO: Go to my bets screen
    },
  });

  const placeWager = handleSubmit((data) => {
    const newWager: WagerRequest = {
      amount: data.amount,
      bet: bet,
      selectedOptionId: option.id,
    };

    createWagerMutation.mutate(newWager);
  });

  return (
    <Sheet isOpen={isOpen} open={open} close={close}>
      <H4>{bet.title}</H4>

      <YStack>
        <Text>{option.title}</Text>
        <Text>Odds: {option.odds}</Text>

        <XStack>
          <XStack>
            <Text>Amount:</Text>
            <Controller
              control={control}
              rules={{
                validate: (amount) => {
                  if (amount <= 0) {
                    return "Must wager at least 1 coin!";
                  }
                  if (option.odds < 0 && amount < option.odds / -100) {
                    return "Must be at least " + option.odds / -100;
                  }
                  // TODO: validate that user has enough coins
                  return true;
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Bet Title"
                  onBlur={onBlur}
                  onChangeText={(amountString) => {
                    onChange(Number(amountString));
                    // TODO: use request to calculate payout
                    const payout = calcPayout(
                      Number(amountString),
                      option.odds
                    );
                    setPayout(payout);
                  }}
                  value={value.toString()}
                />
              )}
              name="amount"
            />
            {errors.amount && <Text>{errors.amount.message}</Text>}
          </XStack>
          <Text>Payout: {payout}</Text>
        </XStack>
        <Button onPress={placeWager}>Place Bet</Button>
      </YStack>
    </Sheet>
  );
};

export default PlaceBetSheet;
