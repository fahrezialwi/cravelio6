const init = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: ''
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
                role: action.payload.role
            }
        case "LOGOUT_SUCCESS":
            return {
                ...state,
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                role: ''
            }
        default:
            return state
    }
}

export default authReducer