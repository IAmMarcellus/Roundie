import { Button, Form, H1, H2, H3, YStack, Input, H4 } from "tamagui";
import { useForm, Controller, useFieldArray } from "react-hook-form";

import useMockData from "../hooks/useMockData";

import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../utils/constants";
const CreateScreen = () => {
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
  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray<Bet>({
      control,
      name: "options",
    });

  const { createBet } = useMockData();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.BETS] });
    },
  });

  const createABet = handleSubmit((data) => console.log(data));

  return (
    <Form onSubmit={createABet}>
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
        {fields.map((field, index) => {
          return (
            <YStack key={field.id}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder={`Option #${index + 1}`}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name={`options.${index}.title`}
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    placeholder="Odds"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value.toString()}
                  />
                )}
                name={`options.${index}.odds`}
              />
            </YStack>
          );
        })}
      </YStack>
    </Form>
  );
};

export default CreateScreen;
