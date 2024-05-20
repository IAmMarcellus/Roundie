const calcPayout = (amount: number, odds: number) => {
  if (odds > 0) {
    return amount + Math.floor(amount * (odds / 100));
  } else {
    return amount + Math.floor(amount / (odds / -100));
  }
};

export default calcPayout;
