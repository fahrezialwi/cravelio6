const init = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    phoneNumber: '',
    profilePicture: ''
}

const authReducer = (state = init, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                userId: action.payload.userId,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                role: action.payload.role,
                phoneNumber: action.payload.phoneNumber,
                profilePicture: action.payload.profilePicture
            }
        case "KEEP_LOGIN_SUCCESS":
            return {
                ...state,
                userId: action.payload.userId,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                role: action.payload.role,
                phoneNumber: action.payload.phoneNumber,
                profilePicture: action.payload.profilePicture
            }
        case "EDIT_PROFILE_SUCCESS":
            return {
                ...state,
                userId: action.payload.userId,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                role: action.payload.role,
                phoneNumber: action.payload.phoneNumber,
                profilePicture: action.payload.profilePicture
            }
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                userId: '',
                firstName: '',
                lastName: '',
                email: '',
                role: '',
                phoneNumber: '',
                profilePicture: ''
            }
        default:
            return state
    }
}

export default authReducer