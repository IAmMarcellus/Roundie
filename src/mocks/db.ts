import { factory, manyOf, oneOf, primaryKey } from "@mswjs/data";

export const db = factory({
  bet: {
    id: primaryKey(String),
    title: String,
    endDate: Date,
    options: manyOf("betOption", { unique: true }),
  },
  betOption: {
    id: primaryKey(String),
    title: String,
    odds: Number,
  },
  wager: {
    id: primaryKey(String),
    bet: oneOf("bet"),
    selectedOptionId: String,
    amount: Number,
    payout: Number,
  },
});
