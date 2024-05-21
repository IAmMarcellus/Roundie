import { X } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  Fieldset,
  H3,
  H4,
  Input,
  Unspaced,
  XStack,
  YStack,
} from "tamagui";

import Sheet, { SheetProps } from "components/molecules/Sheet";
import useBetData from "hooks/useBetData";
import calcPayout from "utils/calcPayout";
import { QUERY_KEYS } from "utils/constants";

interface PlaceWagerSheetProps extends SheetProps {
  wager?: WagerRequest;
}

const PlaceWagerSheet = ({
  isOpen,
  close,
  wager,
  open,
}: PlaceWagerSheetProps) => {
  const [payout, setPayout] = useState(0);
  const toast = useToastController();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      amount: 0,
    },
  });

  const { fetchWallet } = useBetData();
  const getWalletQuery = useQuery({
    queryKey: [QUERY_KEYS.WALLET],
    queryFn: fetchWallet,
  });
  const walletAmount = getWalletQuery.data?.amount || 0;

  const { createWager } = useBetData();
  const queryClient = useQueryClient();
  const createWagerMutation = useMutation({
    mutationFn: createWager,
    onSuccess: ({ data: newWager }) => {
      queryClient.setQueryData<Wager[]>([QUERY_KEYS.WAGERS], (oldWagers) => {
        if (oldWagers && oldWagers.length) {
          [...oldWagers, newWager];
        }
        return [newWager];
      });
      // In a real app, I'd update the wallet amount on the server when the bet is created
      queryClient.setQueryData<Wallet>([QUERY_KEYS.WALLET], (oldWallet) => {
        const newWalletAmount = (oldWallet?.amount || 1000) - newWager.amount;
        return { amount: newWalletAmount };
      });
      toast.show("Bet created!", {
        message: "New bet successfully created",
      });
      reset();
      close();
    },
    onError: (error) => {
      toast.show("Error creating wager", {
        message: error.message,
      });
      reset();
      close();
    },
  });

  if (!wager) {
    return;
  }

  const { bet } = wager;
  const option = bet.options.find(
    (option) => option.id === wager.selectedOptionId
  );
  if (!option) {
    close();
    return;
  }

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
      <Dialog.Title>
        {bet.title} <H3>- {option.title}</H3>
      </Dialog.Title>
      <XStack justifyContent="space-around">
        <H4>Odds: {option.odds}</H4>

        <H4>Payout: {payout}</H4>
      </XStack>
      <YStack alignItems="center">
        <Fieldset gap="$4" alignItems="center">
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
                if (walletAmount - amount < 0) {
                  return "You don't have enough coins for that wager!";
                }
                return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                inputMode="numeric"
                placeholder="0"
                onBlur={onBlur}
                onChangeText={(amountString) => {
                  onChange(Number(amountString));
                  const payout = calcPayout(Number(amountString), option.odds);
                  setPayout(payout);
                }}
                value={value.toString()}
                size="$10"
                autoFocus
              />
            )}
            name="amount"
          />
          <H4 justifyContent="center">Wager Amount</H4>
        </Fieldset>
      </YStack>
      <Button
        theme="active"
        onPress={() => {
          placeWager();
        }}
        backgroundColor="$accentBackground"
      >
        Place Bet
      </Button>

      <Unspaced>
        <Dialog.Close asChild>
          <Button
            position="absolute"
            top="$3"
            right="$3"
            size="$2"
            circular
            icon={X}
          />
        </Dialog.Close>
      </Unspaced>
    </Sheet>
  );
};

export default PlaceWagerSheet;
