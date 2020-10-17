export const multiplyCountPrice = (price, count) => {
    return price * count;
};

export const subtotal = (ids, items, key) =>
    ids.reduce((p, c) => {
        return (
            p + multiplyCountPrice(items[c].count, Number(items[c].item?.[key]))
        );
    }, 0);

export const outputIsInInput = (input, outpu) => input.includes(outpu[0]);

export const findItemByKey = (array, key, searchId) => {
    return array.find((item) => item[key] === searchId);
};
