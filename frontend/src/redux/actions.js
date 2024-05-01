// actions.js
export const setUser = (email, name) => ({
    type: 'SET_USER',
    payload: { email, name },
  });
  
  export const setExpert = (email, name) => ({
    type: 'SET_EXPERT',
    payload: { email, name },
  });
  
  export const setAdmin = (email, name) => ({
    type: 'SET_ADMIN',
    payload: { email, name },
  });
  