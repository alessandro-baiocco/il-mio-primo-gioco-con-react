import { REMOVE_HEALTH } from "../action";

const initialState = {
  health: 40,
  attack: 3,
  armorClass: 12,
};

const player = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default player;
