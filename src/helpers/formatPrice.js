const spliceInsert = (string, offset, text, removeCount = 0) => {
    let calculatedOffset = offset < 0 ? string.length + offset : offset;
    return (
        string.substring(0, calculatedOffset) +
        text +
        string.substring(calculatedOffset + removeCount)
    );
}

export const formatPrice = (price) => {
    const string = `${(price / 100).toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
    })}`;
    return string.length > 5 ? spliceInsert(string, /-/.test(string) ? -4 : -5, 'g ') : string;
};
