import * as ActionTypes from '../Actions/base/sacolao.actiontypes';
import frutaState from '../States/fruta.state';

function frutaReducer(state = frutaState, action) {
  switch (action.type) {
    case ActionTypes.ADD_FRUTA:
      return {
        ...state,
        ...action.payload,
      };
    case ActionTypes.CLEAR_FRUTA:
      return frutaState;
    default:
      return state;
  }
}

export default frutaReducer;
