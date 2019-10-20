import Cookies from 'universal-cookie'

// Login
export const onLoginUser = (userId, firstName, lastName, email, role, phoneNumber) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            userId, firstName, lastName, email, role, phoneNumber
        }
    }                          
}

// Keep Login
export const keepLogin = (objUser) => {
    return {
        type: 'KEEP_LOGIN_SUCCESS',
        payload: {
            userId: objUser.user_id,
            firstName: objUser.first_name,
            lastName: objUser.last_name,
            email: objUser.email,
            role: objUser.role,
            phoneNumber: objUser.phone_number
        }
    }
}

// Logout
export const onLogoutUser = () => {
    const cookie = new Cookies()
    cookie.remove('userData')
    return {
        type: 'LOGOUT_SUCCESS',
    }
}