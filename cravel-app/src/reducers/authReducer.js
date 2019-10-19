const init = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    phoneNumber: ''
}

const authReducer = (state = init, action) => {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                role: action.payload.role,
                phoneNumber: action.payload.phoneNumber
            }
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                role: '',
                phoneNumber: ''
            }
        default:
            return state
    }
}

export default authReducer