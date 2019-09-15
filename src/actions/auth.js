// Login
export const onLoginUser = (id, firstName, lastName, email) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id, firstName, lastName, email
        }
    }                          
}

// Keep Login
export const keepLogin = (objUser) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            id: objUser.id,
            firstName: objUser.first_name,
            lastName: objUser.last_name,
            email: objUser.email
        }
    }
}

// Logout
export const onLogoutUser = () => {
    localStorage.removeItem('userData')
    return {
        type: 'LOGOUT_SUCCESS',
    }
}