const init = {
    tripId: '',
    tripName: '',
    tripPrice: '',
    pictureLink: '',
    startDate: '',
    endDate: '',
    pax: ''
}

const bookingReducer = (state = init, action) => {
    switch(action.type) {
        case "BOOKING_SUCCESS":
            return {
                ...state,
                tripId: action.payload.tripId,
                tripName: action.payload.tripName,
                tripPrice: action.payload.tripPrice,
                pictureLink: action.payload.pictureLink,
                startDate: action.payload.startDate,
                endDate: action.payload.endDate,
                pax: action.payload.pax
            }
        case "CHECKOUT_SUCCESS":
            return {
                ...state,
                contactFirstName: action.payload.contactFirstName,
                contactLastName: action.payload.contactLastName,
                contactPhoneNumber: action.payload.contactPhoneNumber,
                contactEmail: action.payload.contactEmail,
                participants: action.payload.participants,
                promoCode: action.payload.promoCode,
                promoCodeInput: action.payload.promoCodeInput,
                promoPercentage: action.payload.promoPercentage,
                promoValue: action.payload.promoValue,
                totalPrice: action.payload.totalPrice
            }
        case "CLEAR_BOOKING_SUCCESS":
            return {
                ...state,
                tripId: '',
                tripName: '',
                tripPrice: '',
                pictureLink: '',
                startDate: '',
                endDate: '',
                pax: '',
                contactFirstName: '',
                contactLastName: '',
                contactPhoneNumber: '',
                contactEmail: '',
                participants: '',
                promoCode: '',
                promoCodeInput: '',
                promoPercentage: '',
                promoValue: '',
                totalPrice: ''
            }
        case "SUBMIT_PROOF_SUCCESS":
            return {
                ...state,
                bankName: action.payload.bankName,
                accountHolderName: action.payload.accountHolderName,
                transferProof: action.payload.transferProof
        }
        case "CLEAR_PROOF_SUCCESS":
            return {
                ...state,
                bankName: '',
                accountHolderName: '',
                transferProof: ''
        }
        default:
            return state
    }
}

export default bookingReducer