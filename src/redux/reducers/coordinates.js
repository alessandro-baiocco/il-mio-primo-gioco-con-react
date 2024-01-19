import { DEATH, GO_AHEAD, NEXT_LEVEL } from "../action";

const initialState = {
  position: 0,
  stages: 0,
};

const coordinates = (state = initialState, action) => {
  switch (action.type) {
    case GO_AHEAD:
      return {
        ...state,
        position: action.payload,
      };
    case NEXT_LEVEL:
      return {
        ...state,
        stages: action.payload,
        position: 0,
      };
    case DEATH:
      return {
        ...state,
        stages: action.payload,
        position: action.payload,
      };

    default:
      return state;
  }
};

export default coordinates;
