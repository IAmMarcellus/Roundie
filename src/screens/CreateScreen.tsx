import DateTimePicker from "@react-native-community/datetimepicker";
import { useToastController } from "@tamagui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, H4, Input, Text, YStack } from "tamagui";

import OptionsListForm from "components/OptionsListForm";
import useMockData from "hooks/useMockData";
import { QUERY_KEYS } from "utils/constants";

const CreateScreen = () => {
  const toast = useToastController();
  const [isDatePickerShown, setIsDatePickerShown] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Bet>({
    defaultValues: {
      title: "",
      endDate: new Date(),
      options: [],
    },
  });

  const { createBet } = useMockData();
  const queryClient = useQueryClient();
  const createBetMutation = useMutation({
    mutationFn: createBet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BETS] });
      toast.show("Bet created!", {
        message: "New bet successfully created",
        native: true,
      });
      // TODO: Reset form state?
      // TODO: Go to my bets screen
    },
  });

  const createNewBet = handleSubmit((data) => createBetMutation.mutate(data));

  return (
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
            <>
              <Button
                onPress={() => {
                  setIsDatePickerShown(true);
                }}
              >
                {value}
              </Button>
              {isDatePickerShown && (
                <DateTimePicker
                  value={value}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setIsDatePickerShown(false);
                    onChange(selectedDate);
                    onBlur();
                  }}
                />
              )}
            </>
          )}
          name="endDate"
        />

        <H4>Options</H4>
        <OptionsListForm control={control} />

        <Form.Trigger asChild>
          <Button>Create Bet</Button>
        </Form.Trigger>
      </YStack>
    </Form>
  );
};

export default CreateScreen;
