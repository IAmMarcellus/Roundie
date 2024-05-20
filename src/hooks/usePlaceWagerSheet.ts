import { useState } from "react";

import useModal from "./_useSheet";

const usePlaceWagerModal = () => {
  const [wager, setWager] = useState<Bet>();

  const { isOpen, open, close } = useModal();

  return { isOpen, open, close, wager, setWager };
};

export default usePlaceWagerModal;
