import { Book } from "./types";

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "/avatar.jpeg",
    notes:
      "Small habits can lead to remarkable results over time. The power of atomic habits lies in the compound effect of consistently making small improvements.",
  },
  {
    id: "2",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    coverUrl: "/avatar.jpeg",
    notes:
      "Our brains operate in two modes: System 1 (fast, intuitive) and System 2 (slow, deliberate). Understanding both helps us make better decisions.",
  },
  {
    id: "3",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    coverUrl: "/avatar.jpeg",
    notes:
      "Humans dominate the planet not because of physical strength but because of our ability to cooperate flexibly in large numbers through shared myths and stories.",
  },
  {
    id: "4",
    title: "Deep Work",
    author: "Cal Newport",
    coverUrl: "/avatar.jpeg",
    notes:
      "The ability to focus deeply on challenging tasks is becoming increasingly rare and increasingly valuable in today's distracted world.",
  },
  {
    id: "5",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    coverUrl: "/avatar.jpeg",
    notes:
      "Good design makes products understandable, usable, and enjoyable. Poor design leads to frustration and accidents that are often blamed on the user.",
  },
];
