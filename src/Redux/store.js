import { createStore, combineReducers } from 'redux'
import fruta from '../Reducer/fruta.reducer'

const appReducer = combineReducers({
  fruta
})
const store = createStore(appReducer)

export default store