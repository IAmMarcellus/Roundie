const bets: Bet[] = [
  {
    id: "1",
    title: "Will it rain tomorrow?",
    endDate: new Date(),
    options: [
      {
        id: "1",
        title: "Yes",
        odds: 200,
      },
      {
        id: "2",
        title: "No",
        odds: 300,
      },
    ],
  },
  {
    id: "2",
    title: "Will the sun rise tomorrow?",
    endDate: new Date(),
    options: [
      {
        id: "1",
        title: "Yes",
        odds: 100,
      },
      {
        id: "2",
        title: "No",
        odds: 200,
      },
    ],
  },
  {
    id: "3",
    title: "Will it snow tomorrow?",
    endDate: new Date(),
    options: [
      {
        id: "1",
        title: "Yes",
        odds: 300,
      },
      {
        id: "2",
        title: "No",
        odds: 200,
      },
    ],
  },
];

export default bets;
