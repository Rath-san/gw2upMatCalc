import React from 'react';

const Select = (props) => {
    const { onChange, value, options } = props;
    return (
        <select onChange={onChange}>
            {Boolean(options.length) &&
                options.map((item, i) => {
                    const itemValue = item.value ?? item
                    const itemName = item.name ?? item
                    return <option selected={value === itemValue} key={i} value={itemValue}>{itemName}</option>;
                })}
        </select>
    );
};

export default Select;
