// Booking Detail
export const onBookingTrip = (tripId, tripName, tripPrice, startDate, endDate, pax) => {
    return {
        type: 'BOOKING_SUCCESS',
        payload: {
            tripId, tripName, tripPrice, startDate, endDate, pax
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