import { useQuery } from "@tanstack/react-query";
import { Accordion, H4, YStack } from "tamagui";

import LoadingSpinner from "components/atoms/LoadingSpinner";
import WagerListItem from "components/molecules/WagerListItem";
import useBetData from "hooks/useBetData";
import { QUERY_KEYS } from "utils/constants";

const MyBetsScreen = () => {
  const { fetchWagers } = useBetData();
  const getWagersQuery = useQuery({
    queryKey: [QUERY_KEYS.WAGERS],
    queryFn: fetchWagers,
  });

  const renderWagerList = (wagers: Wager[]) => {
    if (!wagers.length) {
      return <H4>No wagers available</H4>;
    }

    return (
      <Accordion type="multiple">
        {wagers.map((wager) => (
          <WagerListItem key={wager.id} wager={wager} />
        ))}
      </Accordion>
    );
  };

  return (
    <YStack alignItems="center">
      {getWagersQuery.isLoading ? (
        <LoadingSpinner />
      ) : (
        renderWagerList(getWagersQuery.data?.wagers || [])
      )}
    </YStack>
  );
};

export default MyBetsScreen;
