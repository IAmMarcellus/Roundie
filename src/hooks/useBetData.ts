import { HttpResponse, http } from "msw";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import calcPayout from "utils/calcPayout";

const useBetData = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [wagers, setWagers] = useState<Wager[]>([]);
  const [coins, setCoins] = useState<number>(1000);

  const fetchBets = async () => {
    return { bets };
  };

  const createBet = async (newBetRequest: BetRequest) => {
    const optionsWithIds = newBetRequest.options.map((option) => ({
      ...option,
      id: uuidv4(),
    }));

    const newBet: Bet = {
      ...newBetRequest,
      id: uuidv4(),
      options: optionsWithIds,
    };
    setBets([...bets, newBet]);
    return { status: 200, data: newBet };
  };

  const calcWagerPayout = (wager: Wager) => {
    // TODO: find bet using betId instead of passing bet object
    const option = wager.bet.options.find(
      (option) => option.id === wager.selectedOptionId
    );
    // TODO: throw error if option is undefined
    const payout = calcPayout(wager.amount, option?.odds || 0);
    return payout;
  };

  const fetchWagers = async () => {
    return { wagers };
  };

  const createWager = async (newWagerRequest: WagerRequest) => {
    const newWager: Wager = {
      ...newWagerRequest,
      id: uuidv4(),
    };
    if (newWager.amount > coins) {
      // TODO: Return error for too big of a wager
    }
    setCoins(coins - newWager.amount);
    setWagers([...wagers, newWager]);
    return { status: 200, data: newWager };
  };

  return {
    fetchBets,
    createBet,
    fetchWagers,
    createWager,
    calcWagerPayout,
  };
};

export default useBetData;
