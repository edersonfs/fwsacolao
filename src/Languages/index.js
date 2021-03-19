import * as languages from './languages';
import initialState from '../States/initial.state';

export function getLanguage() {
  try {
    return languages[initialState.language];
  } catch (err) {
    console.log(err);
  }
}

export const language = getLanguage();
