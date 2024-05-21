import DateTimePicker from "@react-native-community/datetimepicker";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useToastController } from "@tamagui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";
import {
  Button,
  Fieldset,
  Form,
  H4,
  Input,
  ScrollView,
  Text,
  YStack,
} from "tamagui";

import OptionsListForm from "components/OptionsListForm";
import useBetData from "hooks/useBetData";
import { QUERY_KEYS } from "utils/constants";

type CreateScreenProps = BottomTabScreenProps<BottomTabParamList, "Create">;

const CreateScreen = ({ navigation }: CreateScreenProps) => {
  const toast = useToastController();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BetRequest>({
    defaultValues: {
      title: "",
      endDate: new Date(),
      options: [
        { title: "", odds: 100 },
        { title: "", odds: 100 },
      ],
    },
  });

  const { createBet } = useBetData();
  const queryClient = useQueryClient();
  const createBetMutation = useMutation({
    mutationFn: createBet,
    onSuccess: ({ data: newBet }) => {
      console.log("new bet request success");
      queryClient.setQueryData<Bet[]>([QUERY_KEYS.BETS], (oldBets) => {
        console.log("SETTING QUERY DATA");
        console.log(oldBets);
        console.log(newBet);
        if (oldBets && oldBets?.length > 0) {
          return [...oldBets, newBet];
        }
        return [newBet];
      });
      toast.show("Bet created!", {
        message: "New bet successfully created",
      });
      reset();
      navigation.navigate("Wager");
    },
    onError: (error) => {
      console.log("new bet request error");
      toast.show("Error creating bet", {
        message: error.message,
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
      <ScrollView flex={1}>
        <Form flex={1} onSubmit={createNewBet} backgroundColor="$background075">
          <YStack
            flex={1}
            alignSelf="stretch"
            justifyContent="space-around"
            backgroundColor="$color0"
            paddingHorizontal="$4"
          >
            <Fieldset>
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
              {errors.title && (
                <Text color="red">The bet must have a title</Text>
              )}
            </Fieldset>

            <Fieldset>
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
                      onChange(selectedDate);
                      onBlur();
                    }}
                  />
                )}
                name="endDate"
              />
              {errors.endDate && (
                <Text color="red">The bet must have an end date</Text>
              )}
            </Fieldset>

            <Fieldset>
              <H4>Options</H4>
              <OptionsListForm control={control} />
              {errors.options && (
                <Text color="red">
                  The bet must have at least one option and they must have
                  titles
                </Text>
              )}
            </Fieldset>
            <Form.Trigger asChild>
              <Button
                backgroundColor="$accentBackground"
                borderRadius="$4"
                margin="$4"
              >
                Create Bet
              </Button>
            </Form.Trigger>
          </YStack>
        </Form>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;
