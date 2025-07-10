import { Level } from "./types";

// Add more levels to the existing ones
export const levels: Level[] = [
  {
    id: 1,
    title: "Center the Square",
    description:
      "Move the blue square to the red target using justify-content and align-items",
    options: [
      {
        label: ["justify-content: flex-start", "align-items: flex-start"],
        value: "start-start",
        css: {
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: center", "align-items: center"],
        value: "center-center",
        css: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      {
        label: ["justify-content: flex-end", "align-items: flex-start"],
        value: "end-start",
        css: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: flex-start", "align-items: flex-end"],
        value: "start-end",
        css: {
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    id: 2,
    title: "Move to Bottom Right",
    description:
      "Move the blue square to the red target in the bottom right corner",
    options: [
      {
        label: ["justify-content: center", "align-items: flex-start"],
        value: "center-start",
        css: {
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: flex-end", "align-items: center"],
        value: "end-center",
        css: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        },
      },
      {
        label: ["justify-content: flex-end", "align-items: flex-end"],
        value: "end-end",
        css: {
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        },
      },
      {
        label: ["justify-content: flex-start", "align-items: flex-end"],
        value: "start-end",
        css: {
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        },
      },
    ],
    correctAnswer: 2,
    correctCSS: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
  },
  {
    id: 3,
    title: "Vertical Stack",
    description:
      "Stack the boxes vertically from top to bottom using flex-direction",
    itemCount: 3,
    options: [
      {
        label: ["flex-direction: row", "align-items: flex-start"],
        value: "row-start",
        css: {
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        },
      },
      {
        label: ["flex-direction: column", "align-items: flex-start"],
        value: "column-start",
        css: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        },
      },
      {
        label: ["flex-direction: column", "align-items: center"],
        value: "column-center",
        css: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      },
      {
        label: ["flex-direction: row", "justify-content: center"],
        value: "row-center",
        css: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
  {
    id: 4,
    title: "Equal Space Distribution",
    description:
      "Distribute the boxes with equal space around each one using space-around",
    itemCount: 4,
    options: [
      {
        label: ["justify-content: space-between"],
        value: "space-between",
        css: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: space-around"],
        value: "space-around",
        css: {
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: space-evenly"],
        value: "space-evenly",
        css: {
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
        },
      },
      {
        label: ["justify-content: center"],
        value: "center",
        css: {
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "flex-start",
    },
  },
  {
    id: 5,
    title: "Wrap and Center Lines",
    description:
      "Wrap the boxes to multiple lines and center all lines vertically using align-content",
    itemCount: 9,
    options: [
      {
        label: ["flex-wrap: wrap", "align-items: center"],
        value: "wrap-items-center",
        css: {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "flex-start",
        },
      },
      {
        label: ["flex-wrap: wrap", "align-content: center"],
        value: "wrap-content-center",
        css: {
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "flex-start",
        },
      },
      {
        label: ["flex-wrap: wrap", "justify-content: center"],
        value: "wrap-justify-center",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
        },
      },
      {
        label: ["flex-wrap: nowrap", "align-content: center"],
        value: "nowrap-content-center",
        css: {
          display: "flex",
          flexWrap: "nowrap",
          alignContent: "center",
          justifyContent: "flex-start",
        },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexWrap: "wrap",
      alignContent: "center",
      justifyContent: "flex-start",
    },
  },
  {
    id: 6,
    title: "Reverse Column with End Alignment",
    description:
      "Stack boxes vertically from bottom to top and align them to the right",
    itemCount: 4,
    options: [
      {
        label: ["flex-direction: column", "align-items: flex-end"],
        value: "column-end",
        css: {
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        },
      },
      {
        label: ["flex-direction: column-reverse", "align-items: flex-start"],
        value: "column-reverse-start",
        css: {
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "flex-start",
        },
      },
      {
        label: ["flex-direction: column-reverse", "align-items: flex-end"],
        value: "column-reverse-end",
        css: {
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "flex-end",
        },
      },
      {
        label: ["flex-direction: row-reverse", "align-items: flex-end"],
        value: "row-reverse-end",
        css: {
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "flex-end",
        },
      },
    ],
    correctAnswer: 2,
    correctCSS: {
      display: "flex",
      flexDirection: "column-reverse",
      alignItems: "flex-end",
    },
  },
  {
    id: 7,
    title: "Complex Wrap Layout",
    description:
      "Wrap boxes to multiple lines, space them evenly on each line, and push all lines to the bottom",
    itemCount: 11,
    options: [
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: space-evenly",
          "align-content: flex-start",
        ],
        value: "wrap-evenly-start",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignContent: "flex-start",
        },
      },
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: space-evenly",
          "align-content: flex-end",
        ],
        value: "wrap-evenly-end",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignContent: "flex-end",
        },
      },
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: space-between",
          "align-content: flex-end",
        ],
        value: "wrap-between-end",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignContent: "flex-end",
        },
      },
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: center",
          "align-content: flex-end",
        ],
        value: "wrap-center-end",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "flex-end",
        },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignContent: "flex-end",
    },
  },
  {
    id: 8,
    title: "Master Challenge",
    description:
      "Create a reverse row layout where boxes wrap to new lines, each line is centered, and all lines are distributed with space around them",
    itemCount: 13,
    options: [
      {
        label: [
          "flex-direction: row-reverse",
          "flex-wrap: wrap",
          "justify-content: center",
          "align-content: space-around",
        ],
        value: "master-correct",
        css: {
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "space-around",
        },
      },
      {
        label: [
          "flex-direction: row-reverse",
          "flex-wrap: wrap",
          "justify-content: space-around",
          "align-content: center",
        ],
        value: "master-wrong1",
        css: {
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "center",
        },
      },
      {
        label: [
          "flex-direction: row",
          "flex-wrap: wrap",
          "justify-content: center",
          "align-content: space-around",
        ],
        value: "master-wrong2",
        css: {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "space-around",
        },
      },
      {
        label: [
          "flex-direction: row-reverse",
          "flex-wrap: nowrap",
          "justify-content: center",
          "align-content: space-around",
        ],
        value: "master-wrong3",
        css: {
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignContent: "space-around",
        },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      flexDirection: "row-reverse",
      flexWrap: "wrap",
      justifyContent: "center",
      alignContent: "space-around",
    },
  },
  {
    id: 9,
    title: "Column Alignment Challenge",
    description: "Align items in a column layout using align-content",
    itemCount: 5,
    options: [
      {
        label: ["flex-direction: column", "align-content: flex-start"],
        value: "column-start",
        css: {
          display: "flex",
          flexDirection: "column",
          alignContent: "flex-start",
        },
      },
      {
        label: ["flex-direction: column", "align-content: center"],
        value: "column-center",
        css: {
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        },
      },
      {
        label: ["flex-direction: column", "align-content: space-between"],
        value: "column-between",
        css: {
          display: "flex",
          flexDirection: "column",
          alignContent: "space-between",
        },
      },
      {
        label: ["flex-direction: column", "align-content: space-around"],
        value: "column-around",
        css: {
          display: "flex",
          flexDirection: "column",
          alignContent: "space-around",
        },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      alignContent: "center",
    },
  },
  {
    id: 10,
    title: "Space Distribution",
    description: "Distribute space evenly between items using space-evenly",
    itemCount: 6,
    options: [
      {
        label: ["justify-content: space-between"],
        value: "space-between",
        css: {
          display: "flex",
          justifyContent: "space-between",
        },
      },
      {
        label: ["justify-content: space-around"],
        value: "space-around",
        css: {
          display: "flex",
          justifyContent: "space-around",
        },
      },
      {
        label: ["justify-content: space-evenly"],
        value: "space-evenly",
        css: {
          display: "flex",
          justifyContent: "space-evenly",
        },
      },
      {
        label: ["justify-content: center"],
        value: "center",
        css: {
          display: "flex",
          justifyContent: "center",
        },
      },
    ],
    correctAnswer: 2,
    correctCSS: {
      display: "flex",
      justifyContent: "space-evenly",
    },
  },
  {
    id: 11,
    title: "Advanced Wrap",
    description: "Create a multi-line layout with specific alignment",
    itemCount: 8,
    options: [
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: space-between",
          "align-content: flex-start",
        ],
        value: "wrap-between-start",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignContent: "flex-start",
        },
      },
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: space-around",
          "align-content: center",
        ],
        value: "wrap-around-center",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "center",
        },
      },
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: center",
          "align-content: space-between",
        ],
        value: "wrap-center-between",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "space-between",
        },
      },
      {
        label: [
          "flex-wrap: wrap",
          "justify-content: space-evenly",
          "align-content: flex-end",
        ],
        value: "wrap-evenly-end",
        css: {
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          alignContent: "flex-end",
        },
      },
    ],
    correctAnswer: 2,
    correctCSS: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignContent: "center",
    },
  },
];