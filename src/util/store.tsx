export const getStoredUser = () => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  }

export const saveUserToStorage = (user:any) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearUserFromStorage = () => {
  localStorage.removeItem('user');
};


export const getToken = () => {
  const user = getStoredUser();
  return user ? user.token : null;
}

export const isAuthenticated = () => {
  const user = getStoredUser();
  return user && user.token ? true : false;
};

export const getUserName = () => {
  return getStoredUser()?.username || '';
}

export const getUserId = () => {
  return getStoredUser()?.user_id || '';
}
