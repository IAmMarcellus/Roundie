import { useFocusEffect } from "@react-navigation/native";
import { focusManager } from "@tanstack/react-query";

const useNavQueryFocus = () => {
  useFocusEffect(() => {
    focusManager.setFocused(true);

    return () => {
      focusManager.setFocused(undefined);
    };
  });
};

export default useNavQueryFocus;
