export const GO_AHEAD = "GO_AHEAD";
export const NEXT_LEVEL = "NEXT_LEVEL";
export const REMOVE_HEALTH = "REMOVE_HEALTH";

export const makeAStep = () => {
  return async (dispatch, getState) => {
    dispatch({ type: GO_AHEAD, payload: 1 });
  };
};
export const nextLevel = () => {
  return async (dispatch, getState) => {
    dispatch({ type: NEXT_LEVEL, payload: 1 });
  };
};
