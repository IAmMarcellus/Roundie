type BetBase<T extends BetOptionBase> = {
  title: string;
  endDate: Date;
  options: Array<T>;
};
type BetRequest = BetBase<BetOptionRequest>;
interface Bet extends BetBase<BetOption> {
  id: string;
}

type BetOptionBase = {
  title: string;
  odds: number;
};
type BetOptionRequest = BetOptionBase;
interface BetOption extends BetOptionBase {
  id: string;
}

type WagerBase = {
  selectedOptionId: string;
  amount: number;
  payout?: number;
  bet: Bet;
};
type WagerRequest = WagerBase;
interface Wager extends WagerBase {
  id: string;
  payout: number;
}
// type WagerCalcPayoutRequest = Omit<Wager, "id"
