import { useQuery } from "@tanstack/react-query";
import { Accordion, H4, ScrollView, YStack } from "tamagui";

import LoadingSpinner from "components/atoms/LoadingSpinner";
import BetListItem from "components/molecules/BetListItem";
import PlaceWagerSheet from "components/PlaceWagerSheet";
import useBetData from "hooks/useBetData";
import useNavQueryFocus from "hooks/useNavQueryFocus";
import usePlaceWagerSheet from "hooks/usePlaceWagerSheet";
import { QUERY_KEYS } from "utils/constants";

const WagerScreen = () => {
  useNavQueryFocus();
  const { open, close, isOpen, wager, openSheetForNewWager } =
    usePlaceWagerSheet();
  const { fetchBets } = useBetData();
  const getBetsQuery = useQuery({
    queryKey: [QUERY_KEYS.BETS],
    queryFn: fetchBets,
    staleTime: 5 * 1000 * 60,
  });

  const renderBetList = (bets: Bet[]) => {
    if (!bets.length) {
      return <H4>No bets available</H4>;
    }

    return bets.map((bet) => (
      <BetListItem
        key={bet.id}
        bet={bet}
        onBetOptionPress={openSheetForNewWager}
      />
    ));
  };

  return (
    <YStack alignItems="center">
      {getBetsQuery.isLoading ? (
        <LoadingSpinner />
      ) : (
        <Accordion alignSelf="stretch" type="multiple">
          <ScrollView
            alignSelf="stretch"
            padding="$2"
            backgroundColor="$background0"
            style={{ height: "100%" }}
          >
            {renderBetList(getBetsQuery.data || [])}
          </ScrollView>
        </Accordion>
      )}
      <PlaceWagerSheet
        wager={wager}
        isOpen={isOpen}
        close={close}
        open={open}
      />
    </YStack>
  );
};

export default WagerScreen;
