export const GO_AHEAD = "GO_AHEAD";
export const NEXT_LEVEL = "NEXT_LEVEL";
export const CHANGE_HEALTH = "CHANGE_HEALTH";
export const CHANGE_STATUS = "CHANGE_STATUS";
export const DEATH = "DEATH";
export const CHANGE_WEAPON = "CHANGE_WEAPON";
export const CHANGE_ARMOR = "CHANGE_ARMOR";
export const CHANGE_SHIELD = "CHANGE_SHIELD";
export const CHOOSE_ENEMY = "CHOOSE_ENEMY";
export const ENEMY_DEFEATED = "ENEMY_DEFEATED";
export const ENEMY_HIT = "ENEMY_HIT";

export const makeAStep = (level) => {
  return async (dispatch, getState) => {
    dispatch({ type: GO_AHEAD, payload: level });
  };
};
export const nextLevel = (nextStage) => {
  return async (dispatch, getState) => {
    dispatch({ type: NEXT_LEVEL, payload: nextStage });
  };
};
