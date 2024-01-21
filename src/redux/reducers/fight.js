import { CHOOSE_ENEMY, ENEMY_DEFEATED, ENEMY_HIT } from "../action";

const initialState = {
  enemies: {
    name: "",
    maxHealth: 0,
    health: 0,
    attack: 0,
    defence: 0,
    image: "",
    armorClass: 0,
    bonus: 0,
  },
};

const fight = (state = initialState, action) => {
  switch (action.type) {
    case CHOOSE_ENEMY:
      return {
        ...state,
        enemies: action.payload,
      };
    case ENEMY_HIT:
      return {
        ...state,
        enemies: { ...state.enemies, health: action.payload },
      };
    case ENEMY_DEFEATED:
      return {
        ...state,
        enemies: {
          name: "",
          health: 0,
          attack: 0,
          defence: 0,
          image: "",
          armorClass: 0,
          bonus: 0,
        },
      };
    default:
      return state;
  }
};

export default fight;
