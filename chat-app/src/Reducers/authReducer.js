const initialState = {
  token: localStorage.getItem("token"),
  isAuth: false,
  isLoading: false,
  user: null,
};

const NEWauthReducer = (state = false, action) => {
  switch (action.type) {
    case "USER_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isAuth: true,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isAuth: false,
        user: null,
        token: null,
      };
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "REGISTER_FAIL":
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        token: null,
        user: null,
      };
    default:
      return state;
  }
};

/////////////////////////////////////////////
/////////////////////////////////////////////
const authReducer = (state = false, action) => {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "LOGOUT":
      return false;
    default:
      return state;
  }
};
export default authReducer;
