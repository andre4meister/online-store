const setToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token));
}

export default setToken;
