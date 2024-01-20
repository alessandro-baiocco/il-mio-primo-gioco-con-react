import { CHANGE_ARMOR, CHANGE_SHIELD, CHANGE_WEAPON } from "../action";

const initialState = {
  shield: {
    name: "nessuna",
    bonusAC: 0,
    image: "",
    type: "",
  },
  weapon: {
    name: "nessuna",
    bonusAT: 0,
    image: "",
    type: "",
  },
  armor: {
    name: "nessuno",
    defence: 0,
    image: "",
    type: "",
  },
};

const equipment = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SHIELD:
      return {
        ...state,
        shield: action.payload,
      };
    case CHANGE_ARMOR:
      return {
        ...state,
        armor: action.payload,
      };
    case CHANGE_WEAPON:
      return {
        ...state,
        weapon: action.payload,
      };
    default:
      return state;
  }
};

export default equipment;
