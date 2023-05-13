const setUserData = (userData, isAuth) => {
  localStorage.setItem('isAuth', JSON.stringify(isAuth));
  localStorage.setItem('userData', JSON.stringify(userData));
};

export default setUserData;
