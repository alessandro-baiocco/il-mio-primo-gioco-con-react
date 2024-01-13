import { GO_AHEAD, NEXT_LEVEL } from "../action";

const initialState = {
  health: 40,
  position: [0],
  attack: 3,
  armorClass: 12,
  stages: [0],
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case GO_AHEAD:
      return {
        ...state,
        position: [...state.position, 1],
      };
    case NEXT_LEVEL:
      return {
        ...state,
        stages: [...state.stages],
        position: state.position.filter((number) => number !== action.payload),
      };

    default:
      return state;
  }
};

export default player;
