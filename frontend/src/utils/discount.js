/** Returns a whole-number discount percent, or 0 when no valid discount exists. */
export function discountPercent(regularMinor, discountedMinor) {
    if (
        regularMinor == null ||
        discountedMinor == null ||
        regularMinor <= 0 ||
        discountedMinor <= 0 ||
        discountedMinor >= regularMinor
    ) {
        return 0;
    }
    return Math.round(((regularMinor - discountedMinor) / regularMinor) * 100);
}