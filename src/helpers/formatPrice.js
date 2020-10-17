if (String.prototype.splice === undefined) {
    /**
     * Splices text within a string.
     * @param {int} offset The position to insert the text at (before)
     * @param {string} text The text to insert
     * @param {int} [removeCount=0] An optional number of characters to overwrite
     * @returns {string} A modified string containing the spliced text.
     */
    String.prototype.spliceInsert = function (offset, text, removeCount = 0) {
        let calculatedOffset = offset < 0 ? this.length + offset : offset;
        return (
            this.substring(0, calculatedOffset) +
            text +
            this.substring(calculatedOffset + removeCount)
        );
    };
}

export const formatPrice = (price) => {
    const string = `${(price / 100).toLocaleString('en', {
        useGrouping: false,
        minimumFractionDigits: 2,
    })}`;
    return string.length > 5 ? string.spliceInsert(-5, 'g ') : string;
};
