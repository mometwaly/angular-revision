import { User } from './../../../shared/user.model';
import * as AuthActions from './auth.actions';
export interface State {
  user: User;
  authError: string;
  loading: boolean;
}
const intialState = {
  user: null,
  authError: null,
  loading: false,
};
export function authReducer(
  state = intialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.expiratinDate
      );

      return {
        ...state,
        user: user,
        loading: false,
        authError: null,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
      };
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
