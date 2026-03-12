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
        label: ["flex-direction: row;", "gap: '50px';"],
        css: { flexDirection: "row", gap: "50px" },
      },
      {
        label: ["flex-direction: column;", "gap: '50px';"],
        css: { flexDirection: "column", gap: "50px" },
      },
      {
        label: ["flex-direction: column;", "gap: '0px';"],
        css: { flexDirection: "column", gap: "0px" },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      gap: "50px",
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
        label: ["flex-wrap: nowrap;", "justify-content: flex-start;"],
        css: { flexWrap: "nowrap", justifyContent: "flex-start" },
      },
      {
        label: ["flex-wrap: wrap;", "justify-content: flex-start;"],
        css: { flexWrap: "wrap", justifyContent: "flex-start" },
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
    },
  },
  {
    id: 7,
    title: "Bottom-Centered Tag Group",
    description:
      "Center the tags horizontally, but keep the whole row sitting at the bottom of the container.",
    itemCount: 4,
    options: [
      {
        label: ["justify-content: center;", "align-items: flex-start;"],
        css: { justifyContent: "center", alignItems: "flex-start" },
      },
      {
        label: ["justify-content: center;", "align-items: flex-end;"],
        css: { justifyContent: "center", alignItems: "flex-end" },
      },
      {
        label: ["justify-content: flex-start;", "align-items: flex-end;"],
        css: { justifyContent: "flex-start", alignItems: "flex-end" },
      },
    ],
    correctAnswer: 1,
    correctCSS: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
    },
  },
  {
    id: 8,
    title: "Left-Aligned Center Column",
    description:
      "Stack the items in a column, keep the group vertically centered, and align it to the left.",
    itemCount: 3,
    options: [
      {
        label: [
          "flex-direction: column;",
          "justify-content: center;",
          "align-items: flex-start;",
        ],
        css: {
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
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
        label: [
          "flex-direction: column;",
          "justify-content: flex-end;",
          "align-items: flex-start;",
        ],
        css: {
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
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
        label: ["justify-content: center;", "gap: '15px';", "align-items: center;"],
        css: { justifyContent: "center", gap: "15px", alignItems: "center" },
      },
      {
        label: ["justify-content: space-between;", "gap: '15px';", "align-items: center;"],
        css: { justifyContent: "space-between", gap: "15px", alignItems: "center" },
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
    title: "Top-Centered Mobile Card Stack",
    description:
      "Stack cards vertically, keep them at the top, and center the stack horizontally.",
    itemCount: 4,
    options: [
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
          "align-items: flex-end;",
        ],
        css: {
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
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
    title: "Bottom-Centered Loading Stack",
    description:
      "Place the loading dots in a centered column that sits at the bottom of the container.",
    itemCount: 3,
    options: [
      {
        label: [
          "flex-direction: column;",
          "justify-content: flex-end;",
          "align-items: center;",
        ],
        css: {
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        },
      },
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
          "justify-content: flex-end;",
          "align-items: flex-start;",
        ],
        css: {
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
        },
      },
    ],
    correctAnswer: 0,
    correctCSS: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
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
        label: [
          "justify-content: flex-start;",
          "gap: '8px';",
          "align-items: center;",
        ],
        css: {
          justifyContent: "flex-start",
          gap: "8px",
          alignItems: "center",
        },
      },
      {
        label: [
          "justify-content: space-between;",
          "gap: '8px';",
          "align-items: center;",
        ],
        css: {
          justifyContent: "space-between",
          gap: "8px",
          alignItems: "center",
        },
      },
      {
        label: ["justify-content: center;", "gap: '8px';", "align-items: center;"],
        css: { justifyContent: "center", gap: "8px", alignItems: "center" },
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
    id: 20,
    title: "Footer Menu",
    description:
      "Align footer menu items to the right with consistent spacing between them.",
    itemCount: 3,
    options: [
      {
        label: [
          "justify-content: flex-end;",
          "gap: '12px';",
          "align-items: center;",
        ],
        css: { justifyContent: "flex-end", gap: "12px", alignItems: "center" },
      },
      {
        label: ["justify-content: flex-start;", "gap: '12px';", "align-items: center;"],
        css: { justifyContent: "flex-start", gap: "12px", alignItems: "center" },
      },
      {
        label: ["justify-content: space-between;", "gap: '12px';", "align-items: center;"],
        css: { justifyContent: "space-between", gap: "12px", alignItems: "center" },
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
    {
        id: 21,
        title: "Left-Aligned Button Row",
        description: "Align all buttons to the left, vertically centered in the container.",
        itemCount: 4,
        options: [
            { label: ["justify-content: center;", "align-items: flex-end;"], css: { justifyContent: "center", alignItems: "flex-end" } },
            { label: ["justify-content: flex-end;", "align-items: center;"], css: { justifyContent: "flex-end", alignItems: "center" } },
            { label: ["justify-content: flex-start;", "align-items: center;"], css: { justifyContent: "flex-start", alignItems: "center" } },
        ],
        correctAnswer: 2,
        correctCSS: { display: "flex", justifyContent: "flex-start", alignItems: "center" },
    },
    {
        id: 23,
        title: "Evenly Spaced Vertical List",
        description: "Distribute items evenly from top to bottom in a column.",
        itemCount: 5,
        options: [
            { label: ["flex-direction: column;", "justify-content: space-evenly;"], css: { flexDirection: "column", justifyContent: "space-evenly" } },
            { label: ["flex-direction: column;", "justify-content: space-between;"], css: { flexDirection: "column", justifyContent: "space-between" } },
            { label: ["flex-direction: column;", "justify-content: flex-end;"], css: { flexDirection: "column", justifyContent: "flex-end" } },
        ],
        correctAnswer: 0,
        correctCSS: { display: "flex", flexDirection: "column", justifyContent: "space-evenly" },
    },
    {
        id: 24,
        title: "Right-Aligned Icon Row",
        description: "Align all icons to the right, vertically at the top.",
        itemCount: 4,
        options: [
            { label: ["justify-content: flex-end;", "align-items: flex-end;"], css: { justifyContent: "flex-end", alignItems: "flex-end" } },
            { label: ["justify-content: flex-start;", "align-items: flex-start;"], css: { justifyContent: "flex-start", alignItems: "flex-start" } },
            { label: ["justify-content: flex-end;", "align-items: flex-start;"], css: { justifyContent: "flex-end", alignItems: "flex-start" } },
        ],
        correctAnswer: 2,
        correctCSS: { display: "flex", justifyContent: "flex-end", alignItems: "flex-start" },
    },
    {
        id: 25,
        title: "Right-Centered Column with Gap",
        description: "Stack items in a column, keep the group vertically centered, align it to the right, and preserve the large gap.",
        itemCount: 3,
        options: [
            {
                label: ["flex-direction: column;", "justify-content: center;", "align-items: flex-start;", "gap: '20px';"],
                css: { flexDirection: "column", justifyContent: "center", alignItems: "flex-start", gap: "20px" },
            },
            {
                label: ["flex-direction: column;", "justify-content: center;", "align-items: flex-end;", "gap: '20px';"],
                css: { flexDirection: "column", justifyContent: "center", alignItems: "flex-end", gap: "20px" },
            },
            {
                label: ["flex-direction: column;", "justify-content: flex-end;", "align-items: flex-end;", "gap: '20px';"],
                css: { flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", gap: "20px" },
            },
        ],
        correctAnswer: 1,
        correctCSS: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "20px",
        },
    },
    {
        id: 26,
        title: "Bottom-Centered Row",
        description: "Keep the row centered horizontally, but align all items to the bottom of the container.",
        itemCount: 4,
        options: [
            { label: ["justify-content: flex-start;", "align-items: flex-end;"], css: { justifyContent: "flex-start", alignItems: "flex-end" } },
            { label: ["justify-content: center;", "align-items: flex-end;"], css: { justifyContent: "center", alignItems: "flex-end" } },
            { label: ["justify-content: center;", "align-items: center;"], css: { justifyContent: "center", alignItems: "center" } },
        ],
        correctAnswer: 1,
        correctCSS: {
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
        },
    },
    {
        id: 28,
        title: "Top-Centered Single Row",
        description: "Center the row horizontally, but pin it to the top of the container.",
        itemCount: 5,
        options: [
            { label: ["justify-content: center;", "align-items: flex-start;"], css: { justifyContent: "center", alignItems: "flex-start" } },
            { label: ["justify-content: flex-start;", "align-items: flex-start;"], css: { justifyContent: "flex-start", alignItems: "flex-start" } },
            { label: ["justify-content: center;", "align-items: flex-end;"], css: { justifyContent: "center", alignItems: "flex-end" } },
        ],
        correctAnswer: 0,
        correctCSS: {
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
        },
    },
    {
        id: 29,
        title: "Bottom-Left Column",
        description: "Stack items in a column and place the group in the bottom-left area.",
        itemCount: 4,
        options: [
            {
                label: ["flex-direction: column;", "justify-content: flex-end;", "align-items: flex-start;"],
                css: { flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-start" },
            },
            {
                label: ["flex-direction: column;", "justify-content: flex-start;", "align-items: flex-start;"],
                css: { flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start" },
            },
            {
                label: ["flex-direction: column;", "justify-content: flex-end;", "align-items: center;"],
                css: { flexDirection: "column", justifyContent: "flex-end", alignItems: "center" },
            },
        ],
        correctAnswer: 0,
        correctCSS: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
        },
    },
    {
        id: 30,
        title: "Space Between Columns",
        description: "Stack items in a column with space between top and bottom.",
        itemCount: 3,
        options: [
            { label: ["flex-direction: column;", "justify-content: flex-end;"], css: { flexDirection: "column", justifyContent: "flex-end" } },
            { label: ["flex-direction: column;", "justify-content: space-between;"], css: { flexDirection: "column", justifyContent: "space-between" } },
            { label: ["flex-direction: column;", "justify-content: center;"], css: { flexDirection: "column", justifyContent: "center" } },
        ],
        correctAnswer: 1,
        correctCSS: { display: "flex", flexDirection: "column", justifyContent: "space-between" },
    },
    {
        id: 32,
        title: "Top-Right Column",
        description: "Stack items in a column and place the group in the top-right area.",
        itemCount: 4,
        options: [
            {
                label: ["flex-direction: column;", "justify-content: flex-start;", "align-items: flex-end;"],
                css: { flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-end" },
            },
            {
                label: ["flex-direction: column;", "justify-content: center;", "align-items: flex-end;"],
                css: { flexDirection: "column", justifyContent: "center", alignItems: "flex-end" },
            },
            {
                label: ["flex-direction: column;", "justify-content: flex-start;", "align-items: center;"],
                css: { flexDirection: "column", justifyContent: "flex-start", alignItems: "center" },
            },
        ],
        correctAnswer: 0,
        correctCSS: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
        },
    },
    {
        id: 33,
        title: "Bottom-Centered Row with Large Gap",
        description: "Center the row horizontally, keep it at the bottom, and preserve the large gap between items.",
        itemCount: 3,
        options: [
            {
                label: ["justify-content: center;", "gap: '40px';", "align-items: flex-end;"],
                css: { justifyContent: "center", gap: "40px", alignItems: "flex-end" },
            },
            {
                label: ["justify-content: space-between;", "gap: '40px';", "align-items: flex-end;"],
                css: { justifyContent: "space-between", gap: "40px", alignItems: "flex-end" },
            },
            {
                label: ["justify-content: center;", "gap: '40px';", "align-items: center;"],
                css: { justifyContent: "center", gap: "40px", alignItems: "center" },
            },
        ],
        correctAnswer: 0,
        correctCSS: {
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "40px",
        },
    },
    {
        id: 34,
        title: "Bottom-Right Corner",
        description: "Place a single item in the bottom-right corner of the container.",
        itemCount: 1,
        options: [
            { label: ["justify-content: flex-start;", "align-items: flex-end;"], css: { justifyContent: "flex-start", alignItems: "flex-end" } },
            { label: ["justify-content: flex-end;", "align-items: flex-start;"], css: { justifyContent: "flex-end", alignItems: "flex-start" } },
            { label: ["justify-content: flex-end;", "align-items: flex-end;"], css: { justifyContent: "flex-end", alignItems: "flex-end" } },
        ],
        correctAnswer: 2,
        correctCSS: { display: "flex", justifyContent: "flex-end", alignItems: "flex-end" },
    },
    {
        id: 35,
        title: "Space Around Column",
        description: "Stack items vertically with space around each item.",
        itemCount: 4,
        options: [
            { label: ["flex-direction: column;", "justify-content: space-around;"], css: { flexDirection: "column", justifyContent: "space-around" } },
            { label: ["flex-direction: column;", "justify-content: space-between;"], css: { flexDirection: "column", justifyContent: "space-between" } },
            { label: ["flex-direction: column;", "justify-content: center;"], css: { flexDirection: "column", justifyContent: "center" } },
        ],
        correctAnswer: 0,
        correctCSS: { display: "flex", flexDirection: "column", justifyContent: "space-around" },
    },
];
