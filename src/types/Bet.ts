type Bet = {
  title: string;
  endDate: Date;
  options: Array<Option>;
};

type Option = {
  title: string;
  odds: Number;
};
