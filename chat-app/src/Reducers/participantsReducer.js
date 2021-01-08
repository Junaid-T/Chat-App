const participantViewReducer = (state = false, action) => {
  switch (action.type) {
    case "SHOW":
      return true;
    case "Hide":
      return false;
    default:
      return false;
  }
};

export default participantViewReducer;
