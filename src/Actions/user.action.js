import * as Routes from '../Navigator/routes';

export const login = async (store, navigate, username, password) => {
  try {
    navigate(Routes.Home);
  } catch (err) {
    console.log('err')
  } finally {
    console.log('finally');
  }
}