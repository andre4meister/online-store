const getToken = () => {
  const tokenFromLocalStorage = localStorage.getItem('token');
  const token = tokenFromLocalStorage ? JSON.parse(tokenFromLocalStorage) : false;
  return token;
};

export default getToken;
