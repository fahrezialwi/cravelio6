let formatCurrency = (number) => {
    return number.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
}

export default formatCurrency