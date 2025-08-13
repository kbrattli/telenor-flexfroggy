// lib/levels.ts
import { Level } from "./types";

export const levels: Level[] = [
  {
    id: 1,
    title: "Center an Item",
    description:
      "The most common task: perfectly center the item in the container.",
    itemCount: 1,
    options: [
      {
        label: ["justify-content: flex-start;", "align-items: flex-start;"],
        css: { justifyContent: "flex-start", alignItems: "flex-start" },
      },
      {
        label: ["justify-content: center;", "align-items: center;"],
        css: { justifyContent: "center", alignItems: "center" },
      },
      {
        label: ["justify-content: flex-end;", "align-items: flex-end;"],
        css: { justifyContent: "flex-end", alignItems: "flex-end" },
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
    title: "Build a Navigation Bar",
    description:
      "Space out nav links. The first should be on the far left, the last on the far right.",
    itemCount: 3,
    options: [
      {
        label: ["justify-content: flex-start;", "align-items: center;"],
        css: { justifyContent: "flex-start", alignItems: "center" },
      },
      {
        label: ["justify-content: space-around;", "align-items: center;"],
        css: { justifyContent: "space-around", alignItems: "center" },
      },
      {
        label: ["justify-content: space-between;", "align-items: center;"],
        css: { justifyContent: "space-between", alignItems: "center" },
      },
    ],
    correctAnswer: 2,
    correctCSS: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  {
    id: 3,
    title: "Align Form Buttons",
    description:
      "Group the buttons together and align them to the right, a common pattern in forms.",
    itemCount: 2,
    options: [
      {
        label: ["justify-content: flex-end;", "align-items: center;"],
        css: { justifyContent: "flex-end", alignItems: "center" },
      },
      {
        label: ["justify-content: center;", "align-items: center;"],
        css: { justifyContent: "center", alignItems: "center" },
      },
      {
        label: ["justify-content: space-between;", "align-items: center;"],
        css: { justifyContent: "space-between", alignItems: "center" },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  },
  {
    id: 4,
    title: "Vertical Form Layout",
    description:
      "Stack the items vertically and add some space to create a simple form layout.",
    itemCount: 3,
    options: [
      {
        label: ["flex-direction: row;"],
        css: { flexDirection: "row" },
      },
      {
        label: ["flex-direction: column;", "gap: '10px';"],
        css: { flexDirection: "column", gap: "10px" },
      },
      {
        label: ["flex-direction: column-reverse;", "gap: '10px';"],
        css: { flexDirection: "column-reverse", gap: "10px" },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
  },
  {
    id: 5,
    title: "Sticky Footer Card",
    description:
      "Push the footer to the bottom of the card, regardless of content height.",
    itemCount: 3,
    options: [
      {
        label: ["flex-direction: column;", "justify-content: flex-start;"],
        css: { flexDirection: "column", justifyContent: "flex-start" },
      },
      {
        label: ["flex-direction: column;", "justify-content: center;"],
        css: { flexDirection: "column", justifyContent: "center" },
      },
      {
        label: ["flex-direction: column;", "justify-content: space-between;"],
        css: { flexDirection: "column", justifyContent: "space-between" },
      },
    ],
    correctAnswer: 2,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },
  {
    id: 6,
    title: "Wrapping Photo Gallery",
    description:
      "The items are overflowing! Make them wrap onto the next line to fit.",
    itemCount: 9,
    options: [
      {
        label: ["flex-wrap: nowrap;"],
        css: { flexWrap: "nowrap" },
      },
      {
        label: ["flex-wrap: wrap;"],
        css: { flexWrap: "wrap" },
      },
      {
        label: ["flex-wrap: wrap-reverse;"],
        css: { flexWrap: "wrap-reverse" },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexWrap: "wrap",
    },
  },
  {
    id: 7,
    title: "Centered Tag Group",
    description:
      "Center a group of items, like tags or category buttons, in the middle.",
    itemCount: 4,
    options: [
      {
        label: ["justify-content: center;", "align-items: center;"],
        css: { justifyContent: "center", alignItems: "center" },
      },
      {
        label: ["justify-content: space-between;", "align-items: center;"],
        css: { justifyContent: "space-between", alignItems: "center" },
      },
      {
        label: ["justify-content: flex-start;", "align-items: center;"],
        css: { justifyContent: "flex-start", alignItems: "center" },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    id: 8,
    title: "Vertically Centered Column",
    description:
      "Stack the items in a column and center the entire group vertically.",
    itemCount: 3,
    options: [
      {
        label: ["flex-direction: column;", "justify-content: center;"],
        css: { flexDirection: "column", justifyContent: "center" },
      },
      {
        label: ["flex-direction: column;", "align-items: center;"],
        css: { flexDirection: "column", alignItems: "center" },
      },
      {
        label: ["flex-direction: column;", "justify-content: flex-end;"],
        css: { flexDirection: "column", justifyContent: "flex-end" },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  {
    id: 9,
    title: "Reverse Item Order",
    description: "Display the items in the reverse order, from right to left.",
    itemCount: 3,
    options: [
      {
        label: ["flex-direction: row;", "align-items: center;"],
        css: { flexDirection: "row", alignItems: "center" },
      },
      {
        label: ["flex-direction: row-reverse;", "align-items: center;"],
        css: { flexDirection: "row-reverse", alignItems: "center" },
      },
      {
        label: ["justify-content: flex-end;", "align-items: flex-end;"],
        css: { justifyContent: "flex-end", alignItems: "flex-end" },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
    },
  },
  {
    id: 10,
    title: "Centered Wrapped Gallery",
    description:
      "Allow items to wrap to new lines, and center the items on each line.",
    itemCount: 7,
    options: [
      {
        label: ["flex-wrap: wrap;", "justify-content: flex-start;"],
        css: { flexWrap: "wrap", justifyContent: "flex-start" },
      },
      {
        label: ["flex-wrap: wrap;", "justify-content: space-between;"],
        css: { flexWrap: "wrap", justifyContent: "space-between" },
      },
      {
        label: ["flex-wrap: wrap;", "justify-content: center;"],
        css: { flexWrap: "wrap", justifyContent: "center" },
      },
    ],
    correctAnswer: 2,
    correctCSS: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
    },
  },
  {
    id: 11,
    title: "Dashboard Widget Grid",
    description:
      "Create a dashboard layout with evenly spaced widgets across the container.",
    itemCount: 4,
    options: [
      {
        label: ["justify-content: space-around;", "align-items: center;"],
        css: { justifyContent: "space-around", alignItems: "center" },
      },
      {
        label: ["justify-content: space-between;", "align-items: center;"],
        css: { justifyContent: "space-between", alignItems: "center" },
      },
      {
        label: ["justify-content: center;", "align-items: center;"],
        css: { justifyContent: "center", alignItems: "center" },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
    },
  },
  {
    id: 12,
    title: "Alert Message Bar",
    description:
      "Align alert elements to the left with consistent spacing between them.",
    itemCount: 3,
    options: [
      {
        label: ["justify-content: flex-start;", "gap: '15px';", "align-items: center;"],
        css: { justifyContent: "flex-start", gap: "15px", alignItems: "center" },
      },
      {
        label: ["justify-content: center;", "gap: '15px';"],
        css: { justifyContent: "center", gap: "15px" },
      },
      {
        label: ["justify-content: space-between;"],
        css: { justifyContent: "space-between" },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "15px",
    },
  },
  {
    id: 13,
    title: "Mobile Card Stack",
    description:
      "Stack cards vertically and center them horizontally, perfect for mobile layouts.",
    itemCount: 4,
    options: [
      {
        label: ["flex-direction: column;", "align-items: flex-start;"],
        css: { flexDirection: "column", alignItems: "flex-start" },
      },
      {
        label: ["flex-direction: column;", "align-items: center;"],
        css: { flexDirection: "column", alignItems: "center" },
      },
      {
        label: ["flex-direction: column;", "align-items: flex-end;"],
        css: { flexDirection: "column", alignItems: "flex-end" },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  {
    id: 14,
    title: "Image with Caption",
    description:
      "Stack an image with its caption, pushing the caption to the bottom.",
    itemCount: 2,
    options: [
      {
        label: ["flex-direction: column;", "justify-content: flex-start;"],
        css: { flexDirection: "column", justifyContent: "flex-start" },
      },
      {
        label: ["flex-direction: column;", "justify-content: space-between;"],
        css: { flexDirection: "column", justifyContent: "space-between" },
      },
      {
        label: ["flex-direction: column;", "justify-content: center;"],
        css: { flexDirection: "column", justifyContent: "center" },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },
  {
    id: 15,
    title: "Loading Indicator",
    description:
      "Create a loading screen with dots stacked vertically in the center.",
    itemCount: 3,
    options: [
      {
        label: [
          "flex-direction: column;",
          "justify-content: center;",
          "align-items: center;",
        ],
        css: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      },
      {
        label: [
          "flex-direction: column;",
          "justify-content: flex-start;",
          "align-items: center;",
        ],
        css: {
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        },
      },
      {
        label: ["justify-content: center;", "align-items: center;"],
        css: { justifyContent: "center", alignItems: "center" },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  {
    id: 16,
    title: "Breadcrumb Navigation",
    description:
      "Create a breadcrumb trail with consistent spacing between navigation items.",
    itemCount: 4,
    options: [
      {
        label: ["justify-content: flex-start;", "gap: '8px';", "alignItems: 'center'"],
        css: { justifyContent: "flex-start", gap: "8px" },
      },
      {
        label: ["justify-content: space-between;"],
        css: { justifyContent: "space-between" },
      },
      {
        label: ["justify-content: center;", "gap: '8px';"],
        css: { justifyContent: "center", gap: "8px" },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: "8px",
    },
  },
  {
    id: 17,
    title: "Social Media Icons",
    description:
      "Distribute social media icons evenly across the footer with equal spacing.",
    itemCount: 5,
    options: [
      {
        label: ["justify-content: space-between;", "align-items: center;"],
        css: { justifyContent: "space-between", alignItems: "center" },
      },
      {
        label: ["justify-content: space-evenly;", "align-items: center;"],
        css: { justifyContent: "space-evenly", alignItems: "center" },
      },
      {
        label: ["justify-content: space-around;", "align-items: center;"],
        css: { justifyContent: "space-around", alignItems: "center" },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  },
  {
    id: 18,
    title: "Split Content Layout",
    description:
      "Create a sidebar layout with header at top, content in middle, and footer at bottom.",
    itemCount: 3,
    options: [
      {
        label: ["flex-direction: column;", "justify-content: center;"],
        css: { flexDirection: "column", justifyContent: "center" },
      },
      {
        label: ["flex-direction: column;", "justify-content: space-between;"],
        css: { flexDirection: "column", justifyContent: "space-between" },
      },
      {
        label: ["flex-direction: column;", "justify-content: space-around;"],
        css: { flexDirection: "column", justifyContent: "space-around" },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
  },
  {
    id: 19,
    title: "Tag Cloud Layout",
    description:
      "Allow tags to wrap to new lines and distribute them evenly across each line.",
    itemCount: 6,
    options: [
      {
        label: ["flex-wrap: wrap;", "justify-content: flex-start;"],
        css: { flexWrap: "wrap", justifyContent: "flex-start" },
      },
      {
        label: ["flex-wrap: wrap;", "justify-content: space-around;"],
        css: { flexWrap: "wrap", justifyContent: "space-around" },
      },
      {
        label: ["flex-wrap: wrap;", "justify-content: center;"],
        css: { flexWrap: "wrap", justifyContent: "center" },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
  },
  {
    id: 20,
    title: "Footer Menu",
    description:
      "Align footer menu items to the right with consistent spacing between them.",
    itemCount: 3,
    options: [
      {
        label: [
          "justify-content: flex-end;",
          "gap: '12px'; align-items: center;",
        ],
        css: { justifyContent: "flex-end", gap: "12px", alignItems: "center" },
      },
      {
        label: ["justify-content: flex-start;", "gap: '16px';"],
        css: { justifyContent: "flex-start", gap: "16px" },
      },
      {
        label: ["justify-content: space-between;"],
        css: { justifyContent: "space-between" },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "12px",
    },
  },
];
