import { useQuery } from "@tanstack/react-query";
import { H4, YStack } from "tamagui";

import LoadingSpinner from "components/atoms/LoadingSpinner";
import BetListItem from "components/molecules/BetListItem";
import useBetData from "hooks/useBetData";
import { QUERY_KEYS } from "utils/constants";

const WagerScreen = () => {
  const { fetchBets } = useBetData();
  const getBetsQuery = useQuery({
    queryKey: [QUERY_KEYS.BETS],
    queryFn: fetchBets,
  });

  const renderBetList = (bets: Bet[]) => {
    if (!bets.length) {
      return <H4>No bets available</H4>;
    }

    return bets.map((bet) => <BetListItem key={bet.id} bet={bet} />);
  };

  return (
    <YStack alignItems="center">
      {getBetsQuery.isLoading ? (
        <LoadingSpinner />
      ) : (
        renderBetList(getBetsQuery.data?.bets || [])
      )}
    </YStack>
  );
};

export default WagerScreen;
