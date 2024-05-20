import { Sheet as TamaguiSheet, setupNativeSheet } from "@tamagui/sheet";
import { ModalView } from "react-native-ios-modal";

setupNativeSheet("ios", ModalView);

export type SheetProps = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

interface SheetContainerProps extends SheetProps {
  children: React.ReactNode;
}

const _Sheet = ({ isOpen, open, close, children }: SheetContainerProps) => {
  const onOpenChange = (isSheetOpen: boolean) => {
    isSheetOpen ? open() : close();
  };

  return (
    <TamaguiSheet
      native
      open={isOpen}
      onOpenChange={onOpenChange}
      animation="medium"
      dismissOnSnapToBottom
    >
      <TamaguiSheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <TamaguiSheet.Handle />
      <TamaguiSheet.Frame padding="$4" alignItems="center">
        {children}
      </TamaguiSheet.Frame>
    </TamaguiSheet>
  );
};

export default _Sheet;
