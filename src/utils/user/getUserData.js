export default function getUserData() {
    const userDataFromLocalStorage = localStorage.getItem('userData');
    return userDataFromLocalStorage ? JSON.parse(userDataFromLocalStorage) : null;
}