import { useState } from "react";
import { http, HttpResponse } from "msw";

const useMockData = () => {
  const [bets, setBets] = useState<Bet[]>([]);

  const fetchBets = async () => {
    return { status: 200, data: bets };
  };

  const createBet = async (newBet: Bet) => {
    setBets([...bets, newBet]);
    return { status: 200, data: newBet };
  };

  return {
    fetchBets,
    createBet,
  };
};

export default useMockData;
