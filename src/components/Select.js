import React from 'react';

const Select = (props) => {
    const { onChange, value, options } = props;
    return (
        <select onChange={onChange} value={value}>
            {Boolean(options.length) &&
                options.map((item, i) => {
                    const itemValue = item.value ?? item
                    const itemName = item.name ?? item
                    return <option key={i} value={itemValue}>{itemName}</option>;
                })}
        </select>
    );
};

export default Select;
