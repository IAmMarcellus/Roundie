//import { Sheet as TamaguiSheet, setupNativeSheet } from "@tamagui/sheet";
//import { ModalView } from "react-native-ios-modal";
import { KeyboardAvoidingView } from "react-native";
import { Dialog } from "tamagui";

// setupNativeSheet("ios", ModalView);

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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <KeyboardAvoidingView
          behavior="padding"
          style={{ zIndex: 1000000, alignSelf: "stretch" }}
        >
          <Dialog.Content
            bordered
            elevate
            key="content"
            animateOnly={["transform", "opacity"]}
            animation={[
              "quicker",
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap="$4"
            alignSelf="stretch"
            marginHorizontal="$4"
            y={-50}
          >
            {children}
          </Dialog.Content>
        </KeyboardAvoidingView>
      </Dialog.Portal>
    </Dialog>
  );

  /*
  return (
    <TamaguiSheet
      native
      open={isOpen}
      onOpenChange={onOpenChange}
      animation="medium"
      dismissOnSnapToBottom
      modal
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
  */
};

export default _Sheet;
