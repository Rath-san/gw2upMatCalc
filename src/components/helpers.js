export const multiplyCountPrice = (price, count) => {
    return price * count;
};

export const subtotal = (array, key, recipe) =>
    array.reduce((p, c) => {
        return (
            p + multiplyCountPrice(c?.[key], Number(recipe.input[c.data_id]))
        );
    }, 0);

export const outputIsInInput = (input, outpu) => input.includes(outpu[0]);

export const findItemByKey = (array, key, searchId) => {
    return array.find((item) => item[key] === searchId);
};