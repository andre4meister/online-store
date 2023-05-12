const setUserData = (userData, isAuth) => {
  console.log('setUserData', userData);
  localStorage.setItem('isAuth', JSON.stringify(isAuth));
  localStorage.setItem('userData', JSON.stringify(userData));
};

export default setUserData;
