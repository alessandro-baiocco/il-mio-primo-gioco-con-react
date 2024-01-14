import { DEATH, GO_AHEAD, NEXT_LEVEL } from "../action";

const initialState = {
  position: [0],
  stages: [0],
};

const coordinates = (state = initialState, action) => {
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
    case DEATH:
      return {
        ...state,
        stages: state.stages.filter((number) => number !== action.payload),
        position: state.position.filter((number) => number !== action.payload),
      };

    default:
      return state;
  }
};

export default coordinates;
