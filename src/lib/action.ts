const ACTIONS = {
  ADD: "increase",
  SUBTRACT: "decrease",
  COLOR: "colorselected",
  SIZE: "sizeselected",
  PUT: "change to given value",
};
export type ActionType = keyof typeof ACTIONS;

export default ACTIONS;
