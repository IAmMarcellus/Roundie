import {
  Control,
  Controller,
  FieldArrayWithId,
  useFieldArray,
} from "react-hook-form";
import { Button, Fieldset, H4, Input, Label, XStack, YStack } from "tamagui";

type OptionsListFormProps = {
  control: Control<BetRequest>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OptionsListForm = ({ control }: OptionsListFormProps) => {
  const { fields, append, remove, update } = useFieldArray<BetRequest>({
    control,
    name: "options",
  });

  const addNewOption = () => {
    append({ title: "", odds: 100 });
  };

  const updateOdds = (index: number, amount: number) => {
    let newOdds = amount + fields[index].odds;

    if (newOdds === 0) {
      newOdds = amount * 2 + fields[index].odds;
    }
    update(index, { ...fields[index], odds: newOdds });
  };

  const renderField = (
    field: FieldArrayWithId<Bet, "options", "id">,
    index: number
  ) => (
    <YStack
      key={field.id}
      alignSelf="stretch"
      borderRadius="$4"
      borderWidth
      borderColor="$black075"
      margin="$2"
      padding="$2"
    >
      <XStack alignItems="center" justifyContent="space-between">
        <YStack flex={1} justifyContent="space-between">
          <Fieldset horizontal>
            <Label padding={0} marginRight="$2">
              Name
            </Label>
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
                  style={{ flex: 1 }}
                />
              )}
              name={`options.${index}.title`}
            />
          </Fieldset>
          <Fieldset>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value } }) => (
                // TODO: Must be at least 100, or under -100
                <H4>Odds: {value}</H4>
              )}
              name={`options.${index}.odds`}
            />
          </Fieldset>
        </YStack>
        <YStack flex={0.5}>
          <Button
            flex={1}
            onPress={() => updateOdds(index, 100)}
            borderRadius="$4"
            borderWidth="$1"
            borderColor="$accentBackground"
            margin="$2"
            backgroundColor="$background0"
          >
            +100
          </Button>
          <Button
            flex={1}
            onPress={() => updateOdds(index, -100)}
            borderRadius="$4"
            borderWidth="$1"
            borderColor="$accentBackground"
            margin="$2"
            backgroundColor="$background0"
          >
            -100
          </Button>
        </YStack>
      </XStack>
      {index >= 2 && <Button onPress={() => remove(index)}>Remove</Button>}
    </YStack>
  );

  return (
    <YStack alignItems="center">
      {fields.map(renderField)}
      <Button
        onPress={addNewOption}
        borderRadius="$4"
        borderWidth="$1"
        borderColor="$accentBackground"
        margin="$2"
        backgroundColor="$background0"
      >
        Add Option
      </Button>
    </YStack>
  );
};

export default OptionsListForm;
