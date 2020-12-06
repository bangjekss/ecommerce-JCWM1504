const INITIAL_STATE = {
  id: 0,
  email: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        email: action.payload.email,
        id: action.payload.id,
      };

    default:
      return state;
  }
};

export { userReducer };
