import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import createToken from '../helpers/createToken'

// Login
export const onLoginUser = (userId, firstName, lastName, email, role, phoneNumber) => {
    let d = new Date()
    let cookie = new Cookies()
    let token = createToken(email)

    d.setTime(d.getTime() + (1*24*60*60*1000))
    
    cookie.set(
        'userData', {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            email: email,
            role: role,
            phone_number: phoneNumber
        }, {path: "/", expires: d}
    )

    cookie.set(
        'token', token, {path: "/", expires: d}
    )

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
    toast("You have been logged out", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-container'
    })
    const cookie = new Cookies()
    cookie.remove('userData', { path: '/' })
    cookie.remove('token', { path: '/' })
    return {
        type: 'LOGOUT_SUCCESS',
    }
}