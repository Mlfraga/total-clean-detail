export const isAuthenticated = () => {
    const accessToken = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
        console.log(accessToken);
        return false;
    }

    return true;
}