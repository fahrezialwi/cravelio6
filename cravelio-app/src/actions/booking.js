// Booking Detail
export const onBookingTrip = (tripId, tripName, tripPrice, pictureLink, startDate, endDate, pax) => {
    return {
        type: 'BOOKING_SUCCESS',
        payload: {
            tripId, tripName, tripPrice, pictureLink, startDate, endDate, pax
        }
    }                          
}

// Checkout
export const onCheckout = (
    contactFirstName,
    contactLastName,
    contactPhoneNumber,
    contactEmail,
    participants,
    promoCode,
    promoCodeInput,
    promoPercentage,
    promoValue,
    totalPrice
) => {
    return {
        type: 'CHECKOUT_SUCCESS',
        payload: {
            contactFirstName,
            contactLastName,
            contactPhoneNumber,
            contactEmail,
            participants,
            promoCode,
            promoCodeInput,
            promoPercentage,
            promoValue,
            totalPrice
        }
    }                          
}

// Clear Booking
export const onClearBooking = () => {
    return {
        type: 'CLEAR_BOOKING_SUCCESS',
    }
}

// Submit Proof
export const onSubmitProof = (bankName, accountHolderName, transferProof) => {
    return {
        type: 'SUBMIT_PROOF_SUCCESS',
        payload: {
            bankName, accountHolderName, transferProof
        }
    }                          
}

// Clear Proof
export const onClearProof = () => {
    return {
        type: 'CLEAR_PROOF_SUCCESS',
    }                          
}