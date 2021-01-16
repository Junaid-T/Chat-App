const initialState = {
  token: localStorage.getItem("token"),
  isAuth: false,
  isLoading: false,
  user: null,
  hasError: false,
};

const authReducer = (state = initialState, action) => {
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
        user: action.payload.user,
        isAuth: true,
        hasError: false,
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
        hasError: true,
      };
    default:
      return state;
  }
};

/////////////////////////////////////////////
/////////////////////////////////////////////
// const authReducer = (state = false, action) => {
//   switch (action.type) {
//     case "LOGIN":
//       return true;
//     case "LOGOUT":
//       return false;
//     default:
//       return state;
//   }
// };
export default authReducer;
