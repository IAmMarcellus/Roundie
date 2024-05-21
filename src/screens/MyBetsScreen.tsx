import { useQuery } from "@tanstack/react-query";
import { H4, ScrollView, YStack } from "tamagui";

import LoadingSpinner from "components/atoms/LoadingSpinner";
import WagerListItem from "components/molecules/WagerListItem";
import useBetData from "hooks/useBetData";
import useNavQueryFocus from "hooks/useNavQueryFocus";
import { QUERY_KEYS } from "utils/constants";

const MyBetsScreen = () => {
  useNavQueryFocus();
  const { fetchWagers } = useBetData();
  const getWagersQuery = useQuery({
    queryKey: [QUERY_KEYS.WAGERS],
    queryFn: fetchWagers,
    staleTime: 5 * 1000 * 60,
  });

  const renderWagerList = (wagers: Wager[]) => {
    if (!wagers.length) {
      return <H4>You haven't placed any wagers yet</H4>;
    }

    return (
      <ScrollView
        alignSelf="stretch"
        padding="$2"
        backgroundColor="$background0"
        style={{ height: "100%" }}
      >
        {wagers.map((wager) => (
          <WagerListItem key={wager.id} wager={wager} />
        ))}
      </ScrollView>
    );
  };

  return (
    <YStack alignItems="center">
      {getWagersQuery.isLoading ? (
        <LoadingSpinner />
      ) : (
        renderWagerList(getWagersQuery.data || [])
      )}
    </YStack>
  );
};

export default MyBetsScreen;
