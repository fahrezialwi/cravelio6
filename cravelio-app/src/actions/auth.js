import Cookies from 'universal-cookie'
import { toast } from 'react-toastify'
import signToken from '../helpers/signToken'

const cookie = new Cookies()

// Login
export const onLoginUser = (userId, firstName, lastName, email, role, phoneNumber, profilePicture) => {
    let d = new Date()
    let token = signToken(userId, email, role)

    d.setTime(d.getTime() + (1*24*60*60*1000))
    
    cookie.set(
        'userData', {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            email: email,
            role: role,
            phone_number: phoneNumber,
            profile_picture: profilePicture
        }, {path: "/", expires: d}
    )

    cookie.set(
        'token', token, {path: "/", expires: d}
    )

    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            userId, firstName, lastName, email, role, phoneNumber, profilePicture
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
            phoneNumber: objUser.phone_number,
            profilePicture: objUser.profile_picture
        }
    }
}

// Edit Profile
export const onEditProfile = (userId, firstName, lastName, email, role, phoneNumber, profilePicture) => {
    cookie.remove('userData', { path: '/' })
    cookie.remove('token', { path: '/' })

    let d = new Date()
    let token = signToken(userId, email, role)

    d.setTime(d.getTime() + (1*24*60*60*1000))
    
    cookie.set(
        'userData', {
            user_id: userId,
            first_name: firstName,
            last_name: lastName,
            email: email,
            role: role,
            phone_number: phoneNumber,
            profile_picture: profilePicture
        }, {path: "/", expires: d}
    )

    cookie.set(
        'token', token, {path: "/", expires: d}
    )
    
    return {
        type: 'EDIT_PROFILE_SUCCESS',
        payload: {
            userId, firstName, lastName, email, role, phoneNumber, profilePicture
        }
    }  
}

// Logout
export const onLogoutUser = () => {
    toast("You have been logged out", {
        position: toast.POSITION.BOTTOM_CENTER,
        className: 'toast-container'
    })

    cookie.remove('userData', { path: '/' })
    cookie.remove('token', { path: '/' })
    return {
        type: 'LOGOUT_SUCCESS'
    }
}