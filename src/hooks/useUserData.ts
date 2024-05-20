import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import calcPayout from "utils/calcPayout";

const useUserData = () => {
  const [wagers, setWagers] = useState<Wager[]>([]);
  const [coins, setCoins] = useState<number>(1000);

  const fetchWagers = async () => {
    return { wagers };
  };

  const createWager = async (wagerRequest: WagerRequest) => {
    const wagerOdds =
      wagerRequest.bet.options.find(
        (option) => option.id === wagerRequest.selectedOptionId
      )?.odds || 100;
    // TODO: throw error if selectedOption is undefined
    if (newWager.amount > coins) {
      // TODO: Return error for too big of a wager
    }
    const newWager: Wager = {
      ...wagerRequest,
      id: uuidv4(),
      payout: calcPayout(wagerRequest.amount, wagerOdds),
    };
    setWagers([...wagers, newWager]);
    return { status: 200, data: newWager };
  };

  return {
    fetchWagers,
    createWager,
  };
};

export default useUserData;
