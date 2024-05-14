import {
  Control,
  Controller,
  FieldArrayWithId,
  useFieldArray,
} from "react-hook-form";
import { Button, Input, XStack, YStack } from "tamagui";

type OptionsListFormProps = {
  control: Control<Bet>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OptionsListForm = ({ control }: OptionsListFormProps) => {
  const { fields, append, remove } = useFieldArray<Bet>({
    control,
    name: "options",
  });

  const addNewOption = () => {
    append({ title: "", odds: 100 });
  };

  const renderField = (
    field: FieldArrayWithId<Bet, "options", "id">,
    index: number
  ) => (
    <XStack key={field.id}>
      <YStack>
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
      <Button onPress={() => remove(index)}>Remove</Button>
    </XStack>
  );

  return (
    <YStack alignItems="center">
      {fields.map(renderField)}
      <Button onPress={addNewOption}>Add Option</Button>
    </YStack>
  );
};

export default OptionsListForm;
