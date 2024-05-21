import { useState } from "react";

import useSheet from "./_useSheet";

const usePlaceWagerSheet = () => {
  const [wager, setWager] = useState<WagerRequest>();
  const { isOpen, open, close } = useSheet();

  const openSheetForNewWager = (bet: Bet, option: BetOption) => {
    setWager({ amount: 0, bet, selectedOptionId: option.id });
    open();
  };

  return { isOpen, open, close, wager, setWager, openSheetForNewWager };
};
export default usePlaceWagerSheet;
