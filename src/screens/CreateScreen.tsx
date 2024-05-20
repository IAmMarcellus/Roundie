import DateTimePicker from "@react-native-community/datetimepicker";
import { useToastController } from "@tamagui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";
import {
  Button,
  Form,
  H4,
  Input,
  ScrollView,
  Text,
  YStack,
  ZStack,
} from "tamagui";

import OptionsListForm from "components/OptionsListForm";
import useBetData from "hooks/useBetData";
import { QUERY_KEYS } from "utils/constants";

const CreateScreen = () => {
  const toast = useToastController();
  const [isDatePickerShown, setIsDatePickerShown] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BetRequest>({
    defaultValues: {
      title: "",
      endDate: new Date(),
      options: [],
    },
  });

  const { createBet } = useBetData();
  const queryClient = useQueryClient();
  const createBetMutation = useMutation({
    mutationFn: createBet,
    onSuccess: ({ data: newBet }) => {
      console.log("new bet request success");
      queryClient.setQueryData<Bet[]>([QUERY_KEYS.BETS], (oldBets) => [
        ...(oldBets || []),
        newBet,
      ]);
      toast.show("Bet created!", {
        message: "New bet successfully created",
        native: true,
      });
      // TODO: Reset form state?
      // TODO: Go to my bets screen
    },
    onError: (error) => {
      console.log("new bet request error");
      toast.show("Error creating bet", {
        message: error.message,
        native: true,
      });
    },
  });

  const createNewBet = handleSubmit((data) => createBetMutation.mutate(data));

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={91}
    >
      <ScrollView>
        <Form onSubmit={createNewBet}>
          <YStack alignSelf="center">
            <H4>Bet Title</H4>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Bet Title"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="title"
            />
            {errors.title && <Text>The bet must have a title</Text>}

            <H4>End Date</H4>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DateTimePicker
                  value={value}
                  mode="date"
                  display="spinner"
                  onChange={(event, selectedDate) => {
                    setIsDatePickerShown(false);
                    onChange(selectedDate);
                    onBlur();
                  }}
                />
              )}
              name="endDate"
            />
            {errors.endDate && <Text>The bet must have an end date</Text>}

            <H4>Options</H4>
            <OptionsListForm control={control} />
            {errors.options && (
              <Text>The bet must have at least one option</Text>
            )}

            <Form.Trigger asChild>
              <Button>Create Bet</Button>
            </Form.Trigger>
          </YStack>
        </Form>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
