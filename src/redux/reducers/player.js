import { CHANGE_HEALTH, CHANGE_STATUS } from "../action";

const initialState = {
  health: 40,
  maxHealth: 40,
  attack: 5,
  armorClass: 8,
  status: "normal",
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_HEALTH:
      return {
        ...state,
        health: action.payload,
      };
    case CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default player;
