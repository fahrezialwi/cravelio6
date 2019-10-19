// Booking Detail
export const onBookingTrip = (tripName, tripPrice, startDate, endDate, pax) => {
    return {
        type: 'BOOKING_SUCCESS',
        payload: {
            tripName, tripPrice, startDate, endDate, pax
        }
    }                          
}

// Checkout
export const onCheckout = (participants, totalPrice) => {
    return {
        type: 'CHECKOUT_SUCCESS',
        payload: {
            participants, totalPrice
        }
    }                          
}

// Keep Booking
export const keepBooking = (tripName, tripPrice, startDate, endDate, pax) => {
    return {
        type: 'BOOKING_SUCCESS',
        payload: {
            tripName, tripPrice, startDate, endDate, pax
        }
    }
}