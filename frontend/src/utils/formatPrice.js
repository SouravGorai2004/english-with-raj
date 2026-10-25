export function formatPrice(minorUnits, currency = 'INR') {
    if (minorUnits == null) return '';
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        maximumFractionDigits: 0,
    }).format(minorUnits / 100);
}