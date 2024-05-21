import { randomUUID } from "expo-crypto";

import mockBets from "mocks/bets";
import calcPayout from "utils/calcPayout";

const useBetData = () => {
  const fetchBets = async () => {
    return mockBets;
  };

  const createBet = async (newBetRequest: BetRequest) => {
    const optionsWithIds = newBetRequest.options.map((option) => ({
      ...option,
      id: randomUUID(),
    }));

    const newBet: Bet = {
      ...newBetRequest,
      id: randomUUID(),
      options: optionsWithIds,
    };
    return { status: 200, data: newBet };
  };

  const calcWagerPayout = (wager: WagerRequest) => {
    const option = wager.bet.options.find(
      (option) => option.id === wager.selectedOptionId
    );
    // TODO: throw error if option is undefined
    const payout = calcPayout(wager.amount, option?.odds || 0);
    return payout;
  };

  const fetchWagers = async () => {
    return [] as Wager[];
  };

  const createWager = async (newWagerRequest: WagerRequest) => {
    const newWager: Wager = {
      ...newWagerRequest,
      id: randomUUID(),
      payout: calcWagerPayout(newWagerRequest),
    };
    return { status: 200, data: newWager };
  };

  const fetchWallet = async () => {
    return { amount: 1000 } as Wallet;
  };

  return {
    fetchBets,
    createBet,
    fetchWagers,
    createWager,
    calcWagerPayout,
    fetchWallet,
  };
};

export default useBetData;
