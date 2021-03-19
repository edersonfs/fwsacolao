import { language } from '../../Languages'
const { button } = language

export const showAlert = (store, icon, iconColor, title, message, countSync = '', countUnsync = '', okFunc = () => {}) => {
  const content = {
    icon,
    iconColor,
    title,
    message,
    labelCancel: null,
    labelConfirm: button.ok,
    countSync,
    countUnsync
  }
  store.actions.setDialog(content, null, okFunc)
}

export const showConfirm = (store, icon, iconColor, title, message, cancFunc = null, confFunc = null) => {
  const content = {
    icon,
    iconColor,
    title: title,
    message: message,
    labelCancel: button.cancel,
    labelConfirm: button.confirm
  }
  store.actions.setDialog(content, cancFunc, confFunc)
}

export const createReduxAction = (actionType = '', payload = {}) => {
  return {
    type: actionType,
    payload: payload
  }
}

export default null
