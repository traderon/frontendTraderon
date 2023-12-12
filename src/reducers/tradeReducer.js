import { GET_TRADES, TRADES_LOADING } from "../actions/types";

const initialState = {
  trades: null,
  loading: false,
};

export default function tradeReducer(state = initialState, action) {
  switch (action.type) {
    case TRADES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_TRADES:
      return {
        ...state,
        trades: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
