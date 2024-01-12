import { GO_AHEAD } from "../action";

const initialState = {
  health: 40,
  position: 0,
  attack: 3,
  armorClass: 12,
  stages: 0,
};

const player = (state = initialState, action) => {
  switch (action.type) {
    case GO_AHEAD:
      return {
        ...state,
        position: (state.position += action.payload),
      };

    default:
      return state;
  }
};

export default player;
