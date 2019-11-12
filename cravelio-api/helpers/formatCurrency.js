let formatCurrency = (number) => {
    return number.toLocaleString('en-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
}

module.exports = formatCurrency