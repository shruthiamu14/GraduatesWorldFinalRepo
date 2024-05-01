// reducers.js
const initialState = {
    user: {
      email: '',
      name: '',
    },
    expert: {
      email: '',
      name: '',
    },
    admin: {
      email: '',
      name: '',
    },
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: {
            email: action.payload.email,
            name: action.payload.name,
          },
        };
      case 'SET_EXPERT':
        return {
          ...state,
          expert: {
            email: action.payload.email,
            name: action.payload.name,
          },
        };
      case 'SET_ADMIN':
        return {
          ...state,
          admin: {
            email: action.payload.email,
            name: action.payload.name,
          },
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  