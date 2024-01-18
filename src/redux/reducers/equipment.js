import { CHANGE_SHIELD } from "../action";

const initialState = {
  shield: {
    name: "nessuna",
    bonusAC: 0,
  },
  weapon: {
    name: "nessuna",
    bonusAT: 0,
  },
  armor: {
    name: "nessuna",
    defence: 0,
  },
};

const equipment = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_SHIELD:
      return {
        ...state,
        shield: { ...state.shield, name: action.payload.name, bonusAC: action.payload.bonusAC },
      };
    default:
      return state;
  }
};

export default equipment;
