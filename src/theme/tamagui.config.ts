import { config } from "@tamagui/config/v3";
import { color, radius, size, space, themes, zIndex } from "@tamagui/themes";
import { createTamagui, createTokens } from "tamagui";

const tokens = createTokens({
  size,
  space,
  zIndex,
  color,
  radius,
});

const appConfig = createTamagui(config);

export type Conf = typeof appConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default appConfig;
