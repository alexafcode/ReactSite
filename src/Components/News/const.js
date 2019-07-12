import React from "react";
import SendIcon from "@material-ui/icons/Send";

const category = {
  all: "",
  sport: "sports",
  health: "health",
  science: "science",
  tech: "technology",
  business: "business",
  ent: "entertainment"
};

export const categoryMenu = [
  {
    category: category.all,
    text: "All",
    icon: <SendIcon />
  },
  {
    category: category.sport,
    text: "Sport",
    icon: <SendIcon />
  },
  {
    category: category.health,
    text: "Health",
    icon: <SendIcon />
  },
  {
    category: category.science,
    text: "Science",
    icon: <SendIcon />
  },
  {
    category: category.technology,
    text: "Technology",
    icon: <SendIcon />
  },
  {
    category: category.business,
    text: "Business",
    icon: <SendIcon />
  },
  {
    category: category.ent,
    text: "Entertainment",
    icon: <SendIcon />
  }
];
